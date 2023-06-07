import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('experiences')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @ApiOperation({ summary: 'create a new experience' })
  @Post()
  create(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experienceService.create(createExperienceDto);
  }

  @ApiOperation({ summary: 'get all experiences' })
  @Get()
  findAll() {
    return this.experienceService.findAll();
  }

  @ApiOperation({ summary: 'get experience by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experienceService.findOne(+id);
  }

  @ApiOperation({ summary: 'update experience by id' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.experienceService.update(+id, updateExperienceDto);
  }

  @ApiOperation({ summary: 'delete experience by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experienceService.remove(+id);
  }
}
