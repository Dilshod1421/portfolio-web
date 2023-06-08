import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
import { JwtGuard } from 'src/guards/jwt.guard';

@ApiTags('skills')
@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @ApiOperation({ summary: 'create a new skill' })
  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
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
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  update(@Param('id') id: number, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillService.update(id, updateSkillDto);
  }

  @ApiOperation({ summary: 'delete skill by id' })
  @Delete(':id')
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  remove(@Param('id') id: number) {
    return this.skillService.remove(id);
  }
}
