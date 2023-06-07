import { Controller, Res, Post, Body, Patch, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { Response } from 'express';
import { UpdateAdminInfo } from './dto/update-admin-info.dto';

@ApiTags('admins')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'create admin' })
  @Post('/create-admin')
  signup(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @ApiOperation({ summary: 'admin login' })
  @Post('/login-admin')
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'admin log out' })
  @Post('/logout-admin')
  logout(
    @CookieGetter('refresh_token_admin') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'update admin info' })
  @Patch('/admin-info/:id')
  updateInfo(
    @Body() updateAdminInfo: UpdateAdminInfo,
    @Param('id') id: number,
  ) {
    return this.adminService.updateInfo(updateAdminInfo, id);
  }
}
