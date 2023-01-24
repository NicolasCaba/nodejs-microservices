"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
const sequelize_1 = require("sequelize");
const ProductoVenta = dbConnection_1.default.define('producto_ventas', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    idProducto: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    idVenta: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: true
});
exports.default = ProductoVenta;
