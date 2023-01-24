"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inventario_1 = __importDefault(require("./inventario"));
const producto_1 = __importDefault(require("./producto"));
const defineModelEntityRelationShip = () => {
    producto_1.default.hasOne(inventario_1.default, {
        foreignKey: 'idProducto'
    });
    inventario_1.default.belongsTo(producto_1.default, {
        foreignKey: 'idProducto'
    });
};
exports.default = defineModelEntityRelationShip;
