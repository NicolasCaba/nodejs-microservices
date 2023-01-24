import { Model, Optional } from "sequelize";

// Atributos
interface ProductoCarritoAttributes {
    id: number;
    idProducto: number;
    idCarrito: number;
    cantidad: number;
}

// Atributos de creación | Opcional 'id'
interface ProductoCarritoCreationAttributes
    extends Optional<ProductoCarritoAttributes, 'id'> {};

// Interface Modelo ProductoCarrito
export interface ProductoCarritoInstance
    extends Model<ProductoCarritoAttributes, ProductoCarritoCreationAttributes>, ProductoCarritoAttributes {
        createdAt?: Date;
        updatedAt?: Date;
    }