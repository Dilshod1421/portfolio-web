import {
  Controller,
  Res,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Get,
  ExecutionContext,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { Response } from 'express';
import { UpdateAdminInfo } from './dto/update-admin-info.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
import { JwtGuard } from 'src/guards/jwt.guard';
import { EmailAdminDto } from './dto/email.dto';

@ApiTags('admins')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'create admin' })
  @Post('/create')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @ApiOperation({ summary: 'admin login' })
  @Post('/login')
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'admin log out' })
  @Post('/logout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'get admin info by id' })
  @Get()
  getByEmail(@Body() emailDto: EmailAdminDto) {
    return this.adminService.getByEmail(emailDto);
  }

  @ApiOperation({ summary: 'update admin info' })
  @Patch('/update/:id')
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  updateInfo(
    @Param('id') id: string,
    @Body() updateAdminInfo: UpdateAdminInfo,
  ) {
    return this.adminService.updateInfo(id, updateAdminInfo);
  }

  @ApiOperation({ summary: 'admin new password' })
  @Patch('/new-password/:id')
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  newPassword(@Param('id') id: string, @Body() newPasswordDto: NewPasswordDto) {
    return this.adminService.newPassword(id, newPasswordDto);
  }
}
