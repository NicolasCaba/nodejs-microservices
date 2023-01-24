import { Request, Response } from "express";
import Carrito from "../models/carrito";

/**
 * POST create carrito
 * 
 * @param req Express Request
 * @param res Express Response
 */
export const createCarrito = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const response = await Carrito.create(body);
        res.status(201).send(response);
    } catch (error) {
        res.status(400).send({'message': 'Error al itentar crear carrito', error});
    }
}