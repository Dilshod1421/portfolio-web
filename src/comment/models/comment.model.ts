import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Post } from 'src/post/models/post.model';
import { User } from 'src/user/models/user.model';

interface CommentAttributes {
  description: string;
  user_id: number;
  post_id: number;
}

@Table({ tableName: 'comment' })
export class Comment extends Model<Comment, CommentAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
  })
  post_id: number;
}
