"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const carrito_1 = __importDefault(require("./carrito"));
const productoCarrito_1 = __importDefault(require("./productoCarrito"));
const defineModelEntityRelationShip = () => {
    carrito_1.default.hasMany(productoCarrito_1.default, {
        foreignKey: "idCarrito",
    });
    productoCarrito_1.default.belongsTo(carrito_1.default, {
        foreignKey: 'idCarrito'
    });
};
exports.default = defineModelEntityRelationShip;
