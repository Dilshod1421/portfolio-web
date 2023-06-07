import { Injectable } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Experience } from './models/experience.model';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience) private experienceRepository: typeof Experience,
  ) {}
  async create(createExperienceDto: CreateExperienceDto) {
    const experience = await this.experienceRepository.create(
      createExperienceDto,
    );
    return experience;
  }

  async findAll() {
    const experiences = await this.experienceRepository.findAll();
    return experiences;
  }

  async findOne(id: number) {
    const experience = await this.experienceRepository.findOne({
      where: { id },
    });
    return experience;
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto) {
    const experience = await this.experienceRepository.update(
      updateExperienceDto,
      { where: { id }, returning: true },
    );
    return experience[1][0];
  }

  async remove(id: number) {
    await this.experienceRepository.destroy({ where: { id } });
    return { message: 'Experience deleted successfully' };
  }
}
