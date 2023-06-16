import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ExperienceAttributes {
  company_name: string;
  description: string;
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
    type: DataType.TEXT,
  })
  description: string;
}
