import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { User } from 'src/user/models/user.model';
import { Post } from 'src/post/models/post.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Comment, User, Post]),
    JwtModule.register({}),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
