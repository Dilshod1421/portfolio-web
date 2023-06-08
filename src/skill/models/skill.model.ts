import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface SkillAttributes {
  text: string;
}

@Table({ tableName: 'skill' })
export class Skill extends Model<Skill, SkillAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
  })
  text: string;
}
