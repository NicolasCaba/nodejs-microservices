import sequelize from "../config/dbConnection";
import { CarritoInstance } from './interfaces/carritoInterface';
import { DataTypes } from "sequelize";

const Carrito = sequelize.define<CarritoInstance>(
    'carrito',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        idCliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

export default Carrito;