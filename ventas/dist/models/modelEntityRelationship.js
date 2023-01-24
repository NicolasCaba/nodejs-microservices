"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const venta_1 = __importDefault(require("./venta"));
const productoVenta_1 = __importDefault(require("./productoVenta"));
const defineModelEntityRelationShip = () => {
    venta_1.default.hasMany(productoVenta_1.default, {
        foreignKey: "idVenta",
    });
    productoVenta_1.default.belongsTo(venta_1.default, {
        foreignKey: "idVenta",
    });
};
exports.default = defineModelEntityRelationShip;
