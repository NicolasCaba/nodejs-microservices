import { Request, Response } from "express";
import Inventario from "../models/inventario";
import Producto from '../models/producto';

/**
 * GET All inventario
 * 
 * @param req Express Request
 * @param res Express Response
 */
export const getInventario = async (req: Request, res: Response) => {
    try {
        const response = await Inventario.findAll({
            include: [Producto]
        });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({'message': 'Error al intentar obtener inventario', error});
    }
}

/**
 * POST create inventario
 * 
 * @param req Express Request
 * @param res Express Response
 */
export const createInventario = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const response = await Inventario.create(body);
        res.status(201).send(response);
    } catch (error) {
        res.status(400).send({'message': 'Error al intentar obtener inventario', error});
    }
}

/**
 * GET get inventario by id
 * 
 * @param req Express Request
 * @param res Express Response
 */
export const getInventarioById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await Inventario.findByPk(id, {
            include: [Producto]
        });
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({'message': 'Error al intentar obtener inventario por id', error});
    }
}

