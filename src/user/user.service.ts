import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { hash, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NewPasswordUserDto } from './dto/new-password-user.dto';
import { EmailUserDto } from './dto/email-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async signup(registerDto: RegisterDto, res: Response) {
    const exist_email = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });
    if (exist_email) {
      throw new BadRequestException('Email already exists!');
    }
    let hashed_password: string;
    try {
      hashed_password = await hash(registerDto.password, 7);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const new_user = await this.userRepository.create({
      ...registerDto,
      is_active: true,
      hashed_password,
    });
    const tokens = await this.generateToken(new_user);
    let hashed_refresh_token: string;
    try {
      hashed_refresh_token = await hash(tokens.refresh_token, 7);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const user = await this.userRepository.update(
      { hashed_refresh_token },
      { where: { id: new_user.id }, returning: true },
    );
    return await this.writeToCookie(tokens, user[1][0], res);
  }

  async signin(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;
    const check_email = await this.userRepository.findOne({ where: { email } });
    if (!check_email) {
      throw new BadRequestException('Email is not registreted!');
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
    check_email.is_active = true;
    const tokens = await this.generateToken(check_email);
    let hashed_refresh_token: string;
    try {
      hashed_refresh_token = await hash(tokens.refresh_token, 7);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const user = await this.userRepository.update(
      { hashed_refresh_token },
      { where: { id: check_email.id }, returning: true },
    );
    return await this.writeToCookie(tokens, user[1][0], res);
  }

  async signout(refresh_token: string, res: Response) {
    let data: any;
    try {
      data = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
    const user = await this.userRepository.update(
      { hashed_refresh_token: null },
      { where: { id: data.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    return { message: 'User successfully signed out!', user: user[1][0] };
  }

  async update(updateUserDto: UpdateUserDto, id: number) {
    const user = await this.userRepository.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return user[1][0];
  }

  async newPassword(newPasswordUserDto: NewPasswordUserDto, id: number) {
    const check = await this.userRepository.findOne({ where: { id } });
    let is_match_pass: boolean;
    try {
      is_match_pass = await compare(
        newPasswordUserDto.old_password,
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
      hashed_password = await hash(newPasswordUserDto.new_password, 7);
    } catch (error) {
      throw new BadRequestException('Please enter your new password!');
    }
    if (newPasswordUserDto.old_password == newPasswordUserDto.new_password) {
      throw new BadRequestException('New password is invalid!');
    }
    const user = await this.userRepository.update(
      { hashed_password },
      { where: { id }, returning: true },
    );
    return {
      message: "User's new password has been updated successfully",
      user: user[1][0],
    };
  }

  async findAll() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    if (!users.length) {
      throw new HttpException('Users not found!', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  async findById(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findByEmail(emailDto: EmailUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: emailDto.email },
    });
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    await this.userRepository.destroy({ where: { id } });
    return user;
  }

  private async generateToken(user: User) {
    const jwtPayload = {
      id: user.id,
      is_active: user.is_active,
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

  async writeToCookie(tokens: any, user: User, res: Response) {
    res.cookie('refresh_token_user', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return { tokens, user };
  }
}
