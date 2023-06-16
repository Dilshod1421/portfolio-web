import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 } from 'uuid';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { hash, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NewPasswordUserDto } from './dto/new-password-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async signup(registerDto: RegisterDto, res: Response): Promise<object> {
    try {
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
      const id = v4();
      const new_user = await this.userRepository.create({
        id,
        ...registerDto,
        hashed_password,
      });
      const tokens = await this.generateToken(new_user);
      await this.writeToCookie(tokens, res);
      return { access_token: tokens.access_token };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async signin(loginDto: LoginDto, res: Response): Promise<object> {
    try {
      const { email, password } = loginDto;
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new BadRequestException('Email is not registreted!');
      }
      let is_match_pass: boolean;
      try {
        is_match_pass = await compare(password, user.hashed_password);
        if (!is_match_pass) {
          throw new BadRequestException('Wrong password!');
        }
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const tokens = await this.generateToken(user);
      await this.writeToCookie(tokens.access_token, res);
      return { access_token: tokens.access_token };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async signout(refresh_token: string, res: Response): Promise<object> {
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
      return { message: 'User successfully signed out!' };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<object> {
    try {
      const user = await this.userRepository.update(updateUserDto, {
        where: { id },
        returning: true,
      });
      if (!user[1].length) {
        throw new ForbiddenException('User not found!');
      }
      return { message: 'User successfully updated' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async newPassword(
    id: string,
    newPasswordUserDto: NewPasswordUserDto,
  ): Promise<object> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new ForbiddenException('User not found!');
      }
      let is_match_pass: boolean;
      try {
        is_match_pass = await compare(
          newPasswordUserDto.old_password,
          user.hashed_password,
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
      await this.userRepository.update(
        { hashed_password },
        { where: { id }, returning: true },
      );
      return {
        message: "User's new password has been updated successfully",
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.findAll({
        include: { all: true },
      });
      if (!users.length) {
        throw new BadRequestException('Users list is empty!');
      }
      return users;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!user) {
        throw new BadRequestException('User not found!');
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<object> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new BadRequestException('User not found!');
      }
      await this.userRepository.destroy({ where: { id } });
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async generateToken(user: User) {
    const jwtPayload = {
      id: user.id,
      name: user.first_name,
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

  async writeToCookie(tokens: any, res: Response) {
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }
}
