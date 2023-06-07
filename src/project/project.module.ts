import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './models/project.model';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [SequelizeModule.forFeature([Project]), FileModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
