import {
  Controller,
  Post,
  Res,
  Body,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { NewPasswordDto } from 'src/admin/dto/new-password.dto';
import { NewPasswordUserDto } from './dto/new-password-user.dto';

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

  @ApiOperation({ summary: 'update user profile' })
  @Patch('/:id')
  update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: number) {
    return this.userService.update(updateUserDto, id);
  }

  @ApiOperation({ summary: 'update user password' })
  @Patch('/:id')
  newPassword(
    @Body() newPasswordUserDto: NewPasswordUserDto,
    @Param('id') id: number,
  ) {
    return this.userService.newPassword(newPasswordUserDto, id);
  }

  @ApiOperation({ summary: 'get all users' })
  @Get('/all')
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'get user by id' })
  @Get('/id/:id')
  findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'get user by email' })
  @Get('/email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @ApiOperation({ summary: 'delete user by id' })
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
