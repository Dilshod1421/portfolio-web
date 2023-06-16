import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
import { JwtGuard } from 'src/guards/jwt.guard';

@ApiTags('projects')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: 'create a new project' })
  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFile() image: any,
  ) {
    return this.projectService.create(createProjectDto, image);
  }

  @ApiOperation({ summary: 'get all projects' })
  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @ApiOperation({ summary: 'get project by id' })
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.projectService.findById(id);
  }

  @ApiOperation({ summary: 'update project by id' })
  @Patch(':id')
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFile() image: any,
  ) {
    return this.projectService.update(id, updateProjectDto, image);
  }

  @ApiOperation({ summary: 'delete project by id' })
  @Delete(':id')
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  remove(@Param('id') id: number) {
    return this.projectService.remove(id);
  }
}
