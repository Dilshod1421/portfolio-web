import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Experience } from './models/experience.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Experience]), JwtModule.register({})],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
