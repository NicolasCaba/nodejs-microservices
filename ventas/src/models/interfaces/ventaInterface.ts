import { Model, Optional } from "sequelize";

// Atributos
interface VentaAttributes {
    id: number;
    idCliente: number;
    total: number;
    metodoDePago: string;
    fecha: Date;
}

// Atributos de creación | Opcional 'id'
interface VentaCreationAttributes
    extends Optional<VentaAttributes, 'id'> {};

// Interface Modelo Venta
export interface VentaInstance
    extends Model<VentaAttributes, VentaCreationAttributes>, VentaAttributes {
        createdAt?: Date;
        updatedAt?: Date;
    }