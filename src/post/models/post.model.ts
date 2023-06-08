import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
