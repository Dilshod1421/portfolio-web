import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SocialNetworkService } from './social-network.service';
import { CreateSocialNetworkDto } from './dto/create-social-network.dto';
import { UpdateSocialNetworkDto } from './dto/update-social-network.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
import { JwtGuard } from 'src/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('social-networks')
@Controller('social-network')
export class SocialNetworkController {
  constructor(private readonly socialNetworkService: SocialNetworkService) {}

  @ApiOperation({ summary: 'Create a new social network' })
  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createSocialNetworkDto: CreateSocialNetworkDto,
    @UploadedFile() image: any,
  ) {
    return this.socialNetworkService.create(createSocialNetworkDto, image);
  }

  @ApiOperation({ summary: 'get all social networks' })
  @Get()
  findAll() {
    return this.socialNetworkService.findAll();
  }

  @ApiOperation({ summary: 'get social network by id' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.socialNetworkService.findOne(id);
  }

  @ApiOperation({ summary: 'update social network by id' })
  @Patch(':id')
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: number,
    @Body() updateSocialNetworkDto: UpdateSocialNetworkDto,
    @UploadedFile() image: any,
  ) {
    return this.socialNetworkService.update(id, updateSocialNetworkDto, image);
  }

  @ApiOperation({ summary: 'delete social network by id' })
  @Delete(':id')
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  remove(@Param('id') id: number) {
    return this.socialNetworkService.remove(id);
  }
}
