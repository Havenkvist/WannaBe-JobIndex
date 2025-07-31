import { Model, Column, Table, DataType } from "sequelize-typescript";

@Table({ tableName: "posts" })
export class Post extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column(DataType.TEXT)
  content?: string;
}
