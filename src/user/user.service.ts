import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { hash, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';

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
    const hashed_password = await hash(registerDto.password, 7);
    const new_user = await this.userRepository.create({
      ...registerDto,
      is_active: true,
      hashed_password,
    });
    const tokens = await this.generateToken(new_user);
    const hashed_refresh_token = await hash(tokens.refresh_token, 7);
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
    const is_match_pass = compare(password, check_email.hashed_password);
    if (!is_match_pass) {
      throw new BadRequestException('Wrong password!');
    }
    const tokens = await this.generateToken(check_email);
    const hashed_refresh_token = await hash(tokens.refresh_token, 7);
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
    res.clearCookie('refresh_token_user');
    return { message: 'User successfully signed out!', user: user[1][0] };
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