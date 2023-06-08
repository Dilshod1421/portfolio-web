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
import { NewPasswordDto } from './dto/new-password.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private jwtService: JwtService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    const admins = await this.adminRepository.findAll();
    if (admins.length) {
      throw new BadRequestException('You are not an admin!');
    }
    let hashed_password: string;
    try {
      hashed_password = await hash(createAdminDto.password, 7);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
    console.log('salom');
    let is_match_pass: boolean;
    try {
      is_match_pass = await compare(password, check_email.hashed_password);
      if (!is_match_pass) {
        throw new BadRequestException('Wrong password!');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const tokens = await this.generateTokenAdmin(check_email);
    let hashed_refresh_token: string;
    try {
      hashed_refresh_token = await hash(tokens.refresh_token, 7);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    await this.adminRepository.update(
      { hashed_refresh_token },
      { where: { id: check_email.id }, returning: true },
    );
    await this.writeToCookieAdmin(tokens, res);
    return { access_token: tokens.access_token };
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
    await this.adminRepository.update(
      { hashed_refresh_token: null },
      { where: { id: data.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    return { message: 'Admin successfully logged out!' };
  }

  async updateInfo(updateInfo: UpdateAdminInfo, id: number) {
    await this.adminRepository.update(updateInfo, {
      where: { id },
      returning: true,
    });
    return { message: "Admin's info has been updated successfully" };
  }

  async newPassword(newPasswordDto: NewPasswordDto, id: number) {
    const check = await this.adminRepository.findOne({ where: { id } });
    let is_match_pass: boolean;
    try {
      is_match_pass = await compare(
        newPasswordDto.old_password,
        check.hashed_password,
      );
      if (!is_match_pass) {
        throw new BadRequestException('Old password is wrong!');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    let hashed_password: string;
    try {
      hashed_password = await hash(newPasswordDto.new_password, 7);
    } catch (error) {
      throw new BadRequestException('Please enter your new password!');
    }
    if (newPasswordDto.old_password == newPasswordDto.new_password) {
      throw new BadRequestException('New password is invalid!');
    }
    await this.adminRepository.update(
      { hashed_password },
      { where: { id }, returning: true },
    );
    return { message: "Admin's password has been updated successfully" };
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

  async writeToCookieAdmin(tokens: any, res: Response) {
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }
}
