"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
const sequelize_1 = require("sequelize");
const Carrito = dbConnection_1.default.define('carrito', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    idCliente: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true
});
exports.default = Carrito;
