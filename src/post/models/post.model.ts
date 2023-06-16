import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Comment } from 'src/comment/models/comment.model';

interface PostAttributes {
  title: string;
  content: string;
}

@Table({ tableName: 'post' })
export class Post extends Model<Post, PostAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
  })
  content: string;

  @HasMany(() => Comment)
  comments: Comment[];
}
