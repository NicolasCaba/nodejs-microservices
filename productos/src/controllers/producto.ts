import { Request, Response } from "express";
import Inventario from "../models/inventario";
import Producto from '../models/producto';

/**
 * GET get producto by id
 * 
 * @param req Express Request
 * @param res Express Response
 */
export const getProductoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await Producto.findByPk(id, {
            include: [Inventario]
        });

        if (!response) {
            res.status(404).send({'message': `No se encontro un regitro con el id ${id}`});
            return;
        }

        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({'message': 'Error al intentar obtener producto por id', error});
    }
}