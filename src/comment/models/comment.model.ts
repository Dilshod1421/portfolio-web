import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/models/user.model';
import { Post } from 'src/post/models/post.model';

interface CommentAttributes {
  description: string;
  user_id: string;
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
    type: DataType.STRING,
  })
  user_id: string;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
  })
  post_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Post)
  post: Post;
}
