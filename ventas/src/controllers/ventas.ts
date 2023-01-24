import { Request, Response } from "express";
import { FindOptions, Op } from "sequelize";
import Venta from "../models/venta";
import ProductoVenta from "../models/productoVenta";
import { createProductoVenta } from './productoVenta';

/**
 * POST create venta
 *
 * @param req Express Request
 * @param res Express Response
 */
export const createVenta = async (req: Request, res: Response) => {
    try {
        // const { body } = req;
        const body = {
            idCliente: req.body.idCliente,
            total: req.body.total,
            metodoDePago: req.body.metodoDePago,
            fecha: req.body.fecha,
            productosVenta: req.body.productosVenta
        };

        const { productosVenta, ...bodyVenta } = body;

        const responseCreateVenta = await Venta.create(bodyVenta);

        for (let producto of productosVenta) {
            producto.idVenta = responseCreateVenta.id;
        }

        const responseCreateProductoVenta = await createProductoVenta(productosVenta);
    
        res.status(200).send({'venta': responseCreateVenta, 'productosVenta': responseCreateProductoVenta});
    } catch (error) {
        res.status(500).send({ message: `No se pudo crear el reporte de venta`, error });
    }
};

/**
 * POST get ventas
 *
 * @param req Express Request
 * @param res Express Response
 */
export const getVentas = async (req: Request, res: Response) => {
    try {
        const queryFilter = req.query.fecha;
        let filter: FindOptions = {};
        filter.include = [ProductoVenta];

        if (queryFilter) {
            filter.where = {
                fecha: {
                    [Op.eq]: `${queryFilter}`,
                },
            };
        };

        const response = await Venta.findAll(filter);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ message: `No se pudo obtener el reporte de ventas`, error });
    }
};
