import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Skill } from './models/skill.model';

@Injectable()
export class SkillService {
  constructor(@InjectModel(Skill) private skillRepository: typeof Skill) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    try {
      const skill = await this.skillRepository.create(createSkillDto);
      return skill;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Skill[]> {
    try {
      const skills = await this.skillRepository.findAll();
      if (!skills.length) {
        throw new BadRequestException('Skill list is empty!');
      }
      return skills;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Skill> {
    try {
      const skill = await this.skillRepository.findOne({ where: { id } });
      if (!skill) {
        throw new BadRequestException('Skill not found!');
      }
      return skill;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    try {
      const skill = await this.skillRepository.update(updateSkillDto, {
        where: { id },
        returning: true,
      });
      if (!skill[1].length) {
        throw new BadRequestException('Skill not found!');
      }
      return skill[1][0];
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const skill = await this.skillRepository.findByPk(id);
      if (!skill) {
        throw new BadRequestException('Skill not found!');
      }
      await this.skillRepository.destroy({ where: { id } });
      return { message: 'Skill deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
