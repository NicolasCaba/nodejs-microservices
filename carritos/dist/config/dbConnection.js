"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const parseEnvVars_1 = require("../utils/parseEnvVars");
const dbUsername = (0, parseEnvVars_1.extractStringEnvVar)('DB_USERNAME');
const dbPassword = (0, parseEnvVars_1.extractStringEnvVar)('DB_PASSWORD');
const dbHost = (0, parseEnvVars_1.extractStringEnvVar)('DB_HOST');
const dbDatabase = (0, parseEnvVars_1.extractStringEnvVar)('DB_DATABASE');
const dbSchema = (0, parseEnvVars_1.extractStringEnvVar)('DB_SCHEMA');
const sequelize = new sequelize_1.Sequelize(dbDatabase, dbUsername, dbPassword, {
    host: dbHost,
    dialect: 'postgres',
    schema: dbSchema
    // logging: false
});
exports.default = sequelize;
