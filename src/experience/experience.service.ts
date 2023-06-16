import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Experience } from './models/experience.model';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience) private experienceRepository: typeof Experience,
  ) {}

  async create(createExperienceDto: CreateExperienceDto): Promise<Experience> {
    try {
      const experience = await this.experienceRepository.create(
        createExperienceDto,
      );
      return experience;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Experience[]> {
    try {
      const experiences = await this.experienceRepository.findAll();
      if (!experiences.length) {
        throw new BadRequestException('Experience list is empty!');
      }
      return experiences;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Experience> {
    try {
      const experience = await this.experienceRepository.findOne({
        where: { id },
      });
      if (!experience) {
        throw new BadRequestException('Experience not found!');
      }
      return experience;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateExperienceDto: UpdateExperienceDto,
  ): Promise<Experience> {
    try {
      const experience = await this.experienceRepository.update(
        updateExperienceDto,
        { where: { id }, returning: true },
      );
      if (!experience[1].length) {
        throw new BadRequestException('Experience not found!');
      }
      return experience[1][0];
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const experience = await this.experienceRepository.findOne({
        where: { id },
      });
      if (!experience) {
        throw new BadRequestException('Experience not found!');
      }
      await this.experienceRepository.destroy({ where: { id } });
      return { message: 'Experience deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
