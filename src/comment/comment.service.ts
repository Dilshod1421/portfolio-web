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

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const comment = await this.commentRepository.create(createCommentDto);
      return comment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Comment[]> {
    try {
      const comments = await this.commentRepository.findAll({
        include: { all: true },
      });
      if (!comments.length) {
        throw new BadRequestException('Comments list is empty!');
      }
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Comment> {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!comment) {
        throw new BadRequestException('Comment not found!');
      }
      return comment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    try {
      const comment = await this.commentRepository.update(updateCommentDto, {
        where: { id },
        returning: true,
      });
      if (!comment[1].length) {
        throw new BadRequestException('Comment not found!');
      }
      return comment[1][0];
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const comment = await this.commentRepository.findOne({ where: { id } });
      if (!comment) {
        throw new BadRequestException('Comment not found!');
      }
      await this.commentRepository.destroy({ where: { id } });
      return { message: 'Comment deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
