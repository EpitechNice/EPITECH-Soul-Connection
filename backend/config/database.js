import { Sequelize } from "sequelize";
import { createDB } from "./dbCreate";
// import { MySqlDialect } from "sequelize";

const sequelize = await createDB();

export default sequelize;
