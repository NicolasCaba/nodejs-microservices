import { Optional, Model } from 'sequelize';

// Atributos
interface InventarioAttributes {
    id: number;
    idProducto: number;
    stock: number;
}

// Atributos de creación | Opcional 'id'
interface InventarioCreationAttributes
    extends Optional<InventarioAttributes, 'id'> {};

// Interface Modelo Inventario
export interface InventarioInstance
    extends Model<InventarioAttributes, InventarioCreationAttributes>, InventarioAttributes {
        createdAt?: Date;
        updatedAt?: Date;
    }