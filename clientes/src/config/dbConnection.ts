import { Sequelize } from "sequelize";
import { extractStringEnvVar } from "../utils/parseEnvVars";

const dbUsername = extractStringEnvVar('DB_USERNAME');
const dbPassword = extractStringEnvVar('DB_PASSWORD');
const dbHost = extractStringEnvVar('DB_HOST');
const dbDatabase = extractStringEnvVar('DB_DATABASE');
const dbSchema = extractStringEnvVar('DB_SCHEMA');

const sequelize = new Sequelize(
    dbDatabase,
    dbUsername,
    dbPassword,
    {
        host: dbHost,
        dialect: 'postgres',
        schema: dbSchema
        // logging: false
    }
);

export default sequelize;