import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { hash, compare } from 'bcrypt';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Response } from 'express';
import { UpdateAdminInfo } from './dto/update-admin-info.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private jwtService: JwtService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    const hashed_password = await hash(createAdminDto.password, 7);
    const admin = await this.adminRepository.create({
      ...createAdminDto,
      hashed_password,
    });
    return admin;
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginAdminDto;
    const check_email = await this.adminRepository.findOne({
      where: { email },
    });
    if (!check_email) {
      throw new BadRequestException('Not found email address!');
    }
    const is_match_pass = await compare(password, check_email.hashed_password);
    if (!is_match_pass) {
      throw new BadRequestException('Wrong password!');
    }
    const tokens = await this.generateTokenAdmin(check_email);
    const hashed_refresh_token = await hash(tokens.refresh_token, 7);
    const admin = await this.adminRepository.update(
      { hashed_refresh_token, is_admin: true },
      { where: { id: check_email.id }, returning: true },
    );
    return await this.writeToCookieAdmin(tokens, admin[1][0], res);
  }

  async logout(refresh_token: string, res: Response) {
    let data: any;
    try {
      data = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
    const admin = await this.adminRepository.update(
      { hashed_refresh_token: null },
      { where: { id: data.id }, returning: true },
    );
    res.clearCookie('refresh_token_admin');
    return { message: 'Admin successfully logged out!', admin: admin[1][0] };
  }

  async updateInfo(updateInfo: UpdateAdminInfo, id: number) {
    const admin = await this.adminRepository.update(updateInfo, {
      where: { id },
      returning: true,
    });
    return admin[1][0];
  }

  private async generateTokenAdmin(admin: Admin) {
    const jwtPayload = {
      id: admin.id,
      is_admin: admin.is_admin,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async writeToCookieAdmin(tokens: any, admin: Admin, res: Response) {
    res.cookie('refresh_token_admin', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return { tokens, admin };
  }
}
