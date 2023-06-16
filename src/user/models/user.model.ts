import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Comment } from 'src/comment/models/comment.model';

interface UserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  hashed_password: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserAttributes> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @HasMany(() => Comment)
  comments: Comment[];
}
