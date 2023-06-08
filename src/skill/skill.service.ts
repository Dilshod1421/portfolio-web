import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Skill } from './models/skill.model';

@Injectable()
export class SkillService {
  constructor(@InjectModel(Skill) private skillRepository: typeof Skill) {}

  async create(createSkillDto: CreateSkillDto) {
    const skill = await this.skillRepository.create(createSkillDto);
    return skill;
  }

  async findAll() {
    const skills = await this.skillRepository.findAll();
    return skills;
  }

  async findOne(id: number) {
    const skill = await this.skillRepository.findOne({ where: { id } });
    return skill;
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const skill = await this.skillRepository.update(updateSkillDto, {
      where: { id },
      returning: true,
    });
    return skill[1][0];
  }

  async remove(id: number) {
    await this.skillRepository.destroy({ where: { id } });
    return { message: 'Skill deleted successfully' };
  }
}
