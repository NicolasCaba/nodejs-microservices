import { Model, Optional } from "sequelize";

// Atributos
interface ProductoVentaAttributes {
    id: number;
    idProducto: number;
    idVenta: number;
    cantidad: number;
}

// Atributos de creación | Opcional 'id'
interface ProductoVentaCreationAttributes
    extends Optional<ProductoVentaAttributes, 'id'> {};

// Interface Modelo ProductoVenta
export interface ProductoVentaInstance
    extends Model<ProductoVentaAttributes, ProductoVentaCreationAttributes>, ProductoVentaAttributes {
        createdAt?: Date;
        updatedAt?: Date;
    }