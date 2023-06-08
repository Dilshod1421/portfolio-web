import { Module } from '@nestjs/common';
import { SocialNetworkService } from './social-network.service';
import { SocialNetworkController } from './social-network.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SocialNetwork } from './models/social-network.model';

@Module({
  imports: [SequelizeModule.forFeature([SocialNetwork])],
  controllers: [SocialNetworkController],
  providers: [SocialNetworkService],
})
export class SocialNetworkModule {}
