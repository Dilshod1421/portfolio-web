import { Controller, Post, Res, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'user sign up' })
  @Post('/signup')
  signup(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.signup(registerDto, res);
  }

  @ApiOperation({ summary: 'user sign in' })
  @Post('/signin')
  signin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.signin(loginDto, res);
  }

  @ApiOperation({ summary: 'user sign out' })
  @Post('/signout')
  signout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.signout(refreshToken, res);
  }
}
