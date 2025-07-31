import { Sequelize } from "sequelize-typescript";
import path from "path";

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  models: [path.join(__dirname, "..", "models")],
  logging: false,
});

export default sequelize;
