import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminAttributes {
  username: string;
  email: string;
  hashed_password: string;
  is_admin: boolean;
  hashed_refresh_token: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

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
    defaultValue: false,
  })
  is_admin: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
}
