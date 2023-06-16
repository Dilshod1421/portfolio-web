import {
  Controller,
  Post,
  Res,
  Body,
  Patch,
  Param,
  Get,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { NewPasswordUserDto } from './dto/new-password-user.dto';
import { UserSelfGuard } from 'src/guards/user-self.guard';
import { JwtGuard } from 'src/guards/jwt.guard';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'user sign up' })
  @Post('signup')
  signup(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.signup(registerDto, res);
  }

  @ApiOperation({ summary: 'user sign in' })
  @Post('signin')
  signin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.signin(loginDto, res);
  }

  @ApiOperation({ summary: 'user sign out' })
  @Post('signout')
  signout(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.signout(refresh_token, res);
  }

  @ApiOperation({ summary: 'update user profile' })
  @Patch('info/:id')
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'update user password' })
  @Patch('password/:id')
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtGuard)
  newPassword(
    @Param('id') id: string,
    @Body() newPasswordUserDto: NewPasswordUserDto,
  ) {
    return this.userService.newPassword(id, newPasswordUserDto);
  }

  @ApiOperation({ summary: 'get all users' })
  @Get()
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'get user by id' })
  @Get(':id')
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtGuard)
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'delete user by id' })
  @Delete(':id')
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
