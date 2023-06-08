import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { UserModule } from './user/user.module';
import { User } from './user/models/user.model';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.model';
import { ProjectModule } from './project/project.module';
import { Project } from './project/models/project.model';
import { FileModule } from './file/file.module';
import { ExperienceModule } from './experience/experience.module';
import { Experience } from './experience/models/experience.model';
import { SkillModule } from './skill/skill.module';
import { Skill } from './skill/models/skill.model';
import { SocialNetworkModule } from './social-network/social-network.module';
import { SocialNetwork } from './social-network/models/social-network.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PSQL_HOST,
      port: Number(process.env.PSQL_PORT),
      username: process.env.PSQL_USER,
      password: process.env.PSQL_PASS,
      database: process.env.PSQL_DB,
      models: [Admin, User, Project, Experience, Skill, SocialNetwork],
      autoLoadModels: true,
    }),
    UserModule,
    AdminModule,
    ProjectModule,
    FileModule,
    ExperienceModule,
    SkillModule,
    SocialNetworkModule,
  ],
})
export class AppModule {}
