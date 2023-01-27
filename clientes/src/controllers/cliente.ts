import { Request, Response } from "express";
import Cliente from "../models/cliente";

/**
 * GET All clientes
 * 
 * @param req Express Require
 * @param res Express Response
 */
export const getClientes = async (req: Request, res: Response) => {
    try {
        const response = await Cliente.findAll();
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({'message': 'Error al itentar obtener los clientes', error});
    }
}

/**
 * GET cliente by id
 * 
 * @param req Express Require
 * @param res Express Response
 */
export const getClienteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const response = await Cliente.findByPk(id);

        if (!response) {
            res.status(404).send({'message': `No se encontro cliente por el id ${id}`});
        }

        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({'message': 'Error al itentar obtener cliente por id', error});
    }
}



