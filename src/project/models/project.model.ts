import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ProjectAttributes {
  title: string;
  link: string;
  image: string;
  description: string;
}

@Table({ tableName: 'project' })
export class Project extends Model<Project, ProjectAttributes> {
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
    type: DataType.STRING,
    allowNull: false,
  })
  link: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;
}
