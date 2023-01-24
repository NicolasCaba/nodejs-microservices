import { Model, Optional } from "sequelize";

// Atributos
interface CarritoAttributes {
    id: number;
    idCliente: number;
}

// Atributos de creación | Opcional 'id'
interface CarritoCreationAttributes
    extends Optional<CarritoAttributes, 'id'> {};

// Interface Modelo Carrito
export interface CarritoInstance
    extends Model<CarritoAttributes, CarritoCreationAttributes>, CarritoAttributes {
        createdAt?: Date;
        updatedAt?: Date;
    }