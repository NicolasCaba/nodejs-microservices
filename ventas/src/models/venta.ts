import sequelize from "../config/dbConnection";
import { VentaInstance } from "./interfaces/ventaInterface";
import { DataTypes } from "sequelize";

const Venta = sequelize.define<VentaInstance>(
    'ventas',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        idCliente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        metodoDePago: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

export default Venta;