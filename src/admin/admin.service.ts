import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { Admin } from './models/admin.model';
import { hash, compare } from 'bcrypt';
import { v4 } from 'uuid';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Response } from 'express';
import { UpdateAdminInfo } from './dto/update-admin-info.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { EmailAdminDto } from './dto/email.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private jwtService: JwtService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    try {
      const admins = await this.adminRepository.findAll();
      if (admins.length) {
        throw new BadRequestException('Single admin already exists!');
      }
      const id = v4();
      let hashed_password: string;
      try {
        hashed_password = await hash(createAdminDto.password, 7);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const admin = await this.adminRepository.create({
        id,
        ...createAdminDto,
        hashed_password,
      });
      return admin;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginAdminDto: LoginAdminDto, res: Response): Promise<object> {
    try {
      res.clearCookie('refresh_token_super_admin')
      const { email, password } = loginAdminDto;
      const check_email = await this.adminRepository.findOne({
        where: { email },
      });
      if (!check_email) {
        throw new BadRequestException('Email adress is not match!');
      }
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
      await this.writeToCookieAdmin(tokens, res);
      return { access_token: tokens.access_token };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async logout(refresh_token: string, res: Response): Promise<object> {
    try {
      let data: any;
      try {
        data = await this.jwtService.verify(refresh_token, {
          secret: process.env.REFRESH_TOKEN_KEY,
        });
      } catch (error) {
        throw new ForbiddenException(error.message);
      }
      res.clearCookie('refresh_token');
      return { message: 'Admin successfully logged out!' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getByEmail(emailDto: EmailAdminDto): Promise<Admin> {
    try {
      const admin = await this.adminRepository.findOne({
        where: { email: emailDto.email },
      });
      if (!admin) {
        throw new BadRequestException('Admin not found!');
      }
      return admin;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateInfo(id: string, updateInfo: UpdateAdminInfo): Promise<object> {
    try {
      const admin = await this.adminRepository.update(updateInfo, {
        where: { id },
        returning: true,
      });
      if (!admin[1].length) {
        throw new BadRequestException('Admin not found!');
      }
      return { message: "Admin's info has been updated successfully" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async newPassword(
    id: string,
    newPasswordDto: NewPasswordDto,
  ): Promise<object> {
    try {
      const admin = await this.adminRepository.findOne({ where: { id } });
      if (!admin) {
        throw new BadRequestException('Admin not found!');
      }
      let is_match_pass: boolean;
      try {
        is_match_pass = await compare(
          newPasswordDto.old_password,
          admin.hashed_password,
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
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  private async generateTokenAdmin(admin: Admin) {
    const jwtPayload = {
      id: admin.id,
      is_admin: admin.is_admin,
      username: admin.username,
    };
    try {
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
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async writeToCookieAdmin(tokens: any, res: Response) {
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }
}
