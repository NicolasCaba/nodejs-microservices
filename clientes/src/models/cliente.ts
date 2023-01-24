import sequelize from "../config/dbConnection";
import { ClienteInstance } from './interfaces/clienteInterface';
import { DataTypes } from "sequelize";

const Cliente = sequelize.define<ClienteInstance>(
    'cliente',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, 
        cupo: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

export default Cliente;