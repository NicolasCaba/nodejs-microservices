import { Model, Optional } from "sequelize";

// Atributos
interface ClienteAttributes {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    cupo: number;
}

// Atributos de creación | Opcional 'id'
interface ClienteCreationAttributes
    extends Optional<ClienteAttributes, 'id'> {};

// Interface Modelo Cliente
export interface ClienteInstance
    extends Model<ClienteAttributes, ClienteCreationAttributes>, ClienteAttributes {
        createdAt?: Date;
        updatedAt?: Date;
    }