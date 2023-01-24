import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection";
import { ProductoCarritoInstance } from "./interfaces/productoCarritoInterface";

const ProductoCarrito = sequelize.define<ProductoCarritoInstance>(
    'producto_carrito',
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
        idCarrito: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

export default ProductoCarrito;