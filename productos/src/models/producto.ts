import sequelize from "../config/dbConnection";
import { ProductoInstance } from "./interfaces/productoInterface";
import { DataTypes } from 'sequelize';


const Producto = sequelize.define<ProductoInstance>(
    'producto',
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
        precio: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: true
    }
);

export default Producto;