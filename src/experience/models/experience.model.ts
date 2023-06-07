import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ExperienceAttributes {
  company_name: string;
  description: string;
  frameworks: string;
}

@Table({ tableName: 'experience' })
export class Experience extends Model<Experience, ExperienceAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  company_name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  frameworks: string;
}
