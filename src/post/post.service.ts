import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async create(createPostDto: CreatePostDto) {
    const post = await this.postRepository.create(createPostDto);
    return post;
  }

  async findAll() {
    const posts = await this.postRepository.findAll();
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.update(updatePostDto, {
      where: { id },
      returning: true,
    });
    return post[1][0];
  }

  async remove(id: number) {
    await this.postRepository.destroy({ where: { id } });
    return { message: 'Post deleted successfully' };
  }
}
