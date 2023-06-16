import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminAttributes {
  id: string;
  username: string;
  email: string;
  hashed_password: string;
  is_admin: boolean;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

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

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_admin: boolean;
}
