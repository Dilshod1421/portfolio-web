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
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('projects')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: 'create a new project' })
  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFile() image: any,
  ) {
    return this.projectService.create(createProjectDto, image);
  }

  @ApiOperation({ summary: 'get all projects' })
  @Get('/all')
  findAll() {
    return this.projectService.findAll();
  }

  @ApiOperation({ summary: 'get project by id' })
  @Get('/id/:id')
  findById(@Param('id') id: number) {
    return this.projectService.findById(id);
  }

  @ApiOperation({ summary: 'get project by id' })
  @Get('/title/:title')
  findByTitle(@Param('title') title: string) {
    return this.projectService.findByTitle(title);
  }

  @ApiOperation({ summary: 'update project by id' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.projectService.remove(id);
  }
}
