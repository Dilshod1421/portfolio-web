import { Module } from '@nestjs/common';
import { SocialNetworkService } from './social-network.service';
import { SocialNetworkController } from './social-network.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SocialNetwork } from './models/social-network.model';
import { JwtModule } from '@nestjs/jwt';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    SequelizeModule.forFeature([SocialNetwork]),
    FileModule,
    JwtModule.register({}),
  ],
  controllers: [SocialNetworkController],
  providers: [SocialNetworkService],
})
export class SocialNetworkModule {}
