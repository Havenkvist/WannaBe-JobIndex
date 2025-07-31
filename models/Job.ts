import { Model, Column, Table, DataType, CreatedAt } from "sequelize-typescript";

@Table({ tableName: "jobs" })
export class Job extends Model {
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

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  company!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location!: string;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt!: Date;
}
