import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { User } from 'src/user/models/user.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const comment = await this.commentRepository.create(createCommentDto);
    return comment;
  }

  async findAll() {
    const comments = await this.commentRepository.findAll();
    return comments;
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({ where: { id } });
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const check_user_id = await this.commentRepository.findOne({
      where: { id },
    });
    try {
      await this.userRepository.findOne({
        where: { id: check_user_id.user_id },
      });
    } catch (error) {
      throw new BadRequestException('User is not match!', error.message);
    }
    const comment = await this.commentRepository.update(updateCommentDto, {
      where: { id },
      returning: true,
    });
    return comment[1][0];
  }

  async remove(id: number) {
    const check_user_id = await this.commentRepository.findOne({
      where: { id },
    });
    try {
      await this.userRepository.findOne({
        where: { id: check_user_id.user_id },
      });
    } catch (error) {
      throw new BadRequestException('User is not match!', error.message);
    }
    await this.commentRepository.destroy({ where: { id } });
    return { message: 'Comment deleted successfully' };
  }
}
