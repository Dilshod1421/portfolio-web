import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Skill } from './models/skill.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Skill]), JwtModule.register({})],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
