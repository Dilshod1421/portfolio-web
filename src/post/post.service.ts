import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const post = await this.postRepository.create(createPostDto);
      return post;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      const posts = await this.postRepository.findAll({
        include: { all: true },
      });
      if (!posts.length) {
        throw new BadRequestException('Posts list is empty!');
      }
      return posts;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Post> {
    try {
      const post = await this.postRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!post) {
        throw new BadRequestException('Post not found!');
      }
      return post;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    try {
      const post = await this.postRepository.update(updatePostDto, {
        where: { id },
        returning: true,
      });
      if (!post[1].length) {
        throw new BadRequestException('Post not found!');
      }
      return post[1][0];
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const post = await this.postRepository.findOne({ where: { id } });
      if (!post) {
        throw new BadRequestException('Post not found!');
      }
      await this.postRepository.destroy({ where: { id } });
      return { message: 'Post deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
