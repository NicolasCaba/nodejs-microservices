import sequelize from "../config/dbConnection";
import { DataTypes } from "sequelize";
import { ProductoVentaInstance } from "./interfaces/productoVenta";

const ProductoVenta = sequelize.define<ProductoVentaInstance>(
    'producto_ventas',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        idProducto: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idVenta: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        timestamps: true
    }
);

export default ProductoVenta;