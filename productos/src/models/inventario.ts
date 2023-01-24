import sequelize from "../config/dbConnection";
import { InventarioInstance } from "./interfaces/inventarioInterface";
import { DataTypes } from 'sequelize';

const Inventario = sequelize.define<InventarioInstance>(
    'inventario',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        idProducto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

export default Inventario;