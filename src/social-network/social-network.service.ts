import { Injectable } from '@nestjs/common';
import { CreateSocialNetworkDto } from './dto/create-social-network.dto';
import { UpdateSocialNetworkDto } from './dto/update-social-network.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SocialNetwork } from './models/social-network.model';

@Injectable()
export class SocialNetworkService {
  constructor(
    @InjectModel(SocialNetwork)
    private socialNetworkRepository: typeof SocialNetwork,
  ) {}

  async create(createSocialNetworkDto: CreateSocialNetworkDto) {
    const social_network = await this.socialNetworkRepository.create(
      createSocialNetworkDto,
    );
    return social_network;
  }

  async findAll() {
    const social_networks = await this.socialNetworkRepository.findAll();
    return social_networks;
  }

  async findOne(id: number) {
    const social_network = await this.socialNetworkRepository.findOne({
      where: { id },
    });
    return social_network;
  }

  async update(id: number, updateSocialNetworkDto: UpdateSocialNetworkDto) {
    const social_network = await this.socialNetworkRepository.update(
      updateSocialNetworkDto,
      { where: { id }, returning: true },
    );
    return social_network[1][0];
  }

  async remove(id: number) {
    await this.socialNetworkRepository.destroy({ where: { id } });
    return { message: 'Social network deleted successfully' };
  }
}
