"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
const sequelize_1 = require("sequelize");
const Venta = dbConnection_1.default.define('ventas', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    idCliente: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    metodoDePago: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true
});
exports.default = Venta;
