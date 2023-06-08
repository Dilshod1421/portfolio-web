import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface SocialNetworkAttributes {
  link: string;
  icon: string;
}

@Table({ tableName: 'social-network' })
export class SocialNetwork extends Model<
  SocialNetwork,
  SocialNetworkAttributes
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  link: string;

  @Column({
    type: DataType.STRING,
  })
  icon: string;
}
