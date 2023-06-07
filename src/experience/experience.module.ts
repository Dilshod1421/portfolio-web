import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Experience } from './models/experience.model';

@Module({
  imports: [SequelizeModule.forFeature([Experience])],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
