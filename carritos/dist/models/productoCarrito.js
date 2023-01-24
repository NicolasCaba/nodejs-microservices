"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
const ProductoCarrito = dbConnection_1.default.define('producto_carrito', {
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
    idCarrito: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
});
exports.default = ProductoCarrito;
