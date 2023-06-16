import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSocialNetworkDto } from './dto/create-social-network.dto';
import { UpdateSocialNetworkDto } from './dto/update-social-network.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SocialNetwork } from './models/social-network.model';
import { FilesService } from 'src/file/file.service';

@Injectable()
export class SocialNetworkService {
  constructor(
    @InjectModel(SocialNetwork)
    private socialNetworkRepository: typeof SocialNetwork,
    private readonly fileService: FilesService,
  ) {}

  async create(
    createSocialNetworkDto: CreateSocialNetworkDto,
    image: any,
  ): Promise<SocialNetwork> {
    try {
      let icon: string;
      try {
        icon = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const social_network = await this.socialNetworkRepository.create({
        ...createSocialNetworkDto,
        icon,
      });
      return social_network;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<SocialNetwork[]> {
    try {
      const social_networks = await this.socialNetworkRepository.findAll();
      if (!social_networks.length) {
        throw new BadRequestException('Social networks list is empty!');
      }
      return social_networks;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<SocialNetwork> {
    try {
      const social_network = await this.socialNetworkRepository.findOne({
        where: { id },
      });
      if (!social_network) {
        throw new BadRequestException('Social network not found!');
      }
      return social_network;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateSocialNetworkDto: UpdateSocialNetworkDto,
    image?: any,
  ): Promise<SocialNetwork> {
    try {
      if (image) {
        let icon: string;
        try {
          icon = await this.fileService.createFile(image);
        } catch (error) {
          throw new BadRequestException(error.message);
        }
        const social_network = await this.socialNetworkRepository.update(
          {
            ...updateSocialNetworkDto,
            icon,
          },
          { where: { id }, returning: true },
        );
        if (!social_network[1].length) {
          throw new BadRequestException('Social network not found!');
        }
        return social_network[1][0];
      }
      const social_network = await this.socialNetworkRepository.update(
        updateSocialNetworkDto,
        { where: { id }, returning: true },
      );
      if (!social_network[1].length) {
        throw new BadRequestException('Social network not found!');
      }
      return social_network[1][0];
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const social_network = await this.socialNetworkRepository.findByPk(id);
      if (!social_network) {
        throw new BadRequestException('Social network not found!');
      }
      await this.socialNetworkRepository.destroy({ where: { id } });
      return { message: 'Social network deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
