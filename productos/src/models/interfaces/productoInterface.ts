import { Optional, Model } from 'sequelize';

// Atributos
interface ProductoAttributes {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
}

// Atributos de creación | Opcional 'id'
interface ProductoCreationAttributes
    extends Optional<ProductoAttributes, 'id'> {};

// Interface Modelo Producto
export interface ProductoInstance
    extends Model<ProductoAttributes, ProductoCreationAttributes>, ProductoAttributes {
        createdAt?: Date;
        updatedAt?: Date;
    }