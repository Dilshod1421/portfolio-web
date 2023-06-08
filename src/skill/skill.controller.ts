import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('skills')
@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @ApiOperation({ summary: 'create a new skill' })
  @Post()
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillService.create(createSkillDto);
  }

  @ApiOperation({ summary: 'get all skills' })
  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  @ApiOperation({ summary: 'get skill by id' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.skillService.findOne(id);
  }

  @ApiOperation({ summary: 'update skill by id' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillService.update(id, updateSkillDto);
  }

  @ApiOperation({ summary: 'delete skill by id' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.skillService.remove(id);
  }
}
