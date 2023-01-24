import { Request, Response } from "express";
import ProductoVenta from '../models/productoVenta';

/**
 * create producto venta
 * 
 * @param req Express Request
 * @param res Express Response
 */
export const createProductoVenta = async (body: [{idProducto: number, idVenta: number, cantidad: number}]) => {
    try {
        return await ProductoVenta.bulkCreate(body);
    } catch (error) {
        throw error;
    }
}