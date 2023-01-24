import axios from "axios";
import { Request, Response } from "express";
import Carrito from "../models/carrito";
import ProductoCarrito from "../models/productoCarrito";
import { vaidateCreateProducto, validateUpdateProducto } from "../validators/productoCarrito";

/**
 * POST create producto carrito
 * 
 * @param req Express Request
 * @param res Express Response
 */
export const createProductoCarrito = async (req: Request, res: Response) => {
    try {
        const body = {
            idProducto: req.body.idProducto,
            idCarrito: req.body.idCarrito,
            cantidad: req.body.cantidad
        };

        
        const validateResponse = await vaidateCreateProducto(body);

        if (!validateResponse[0]) {
            res.status(400).send({'message': validateResponse[1]});
            return;
        }

        const response = await ProductoCarrito.create(body);
        res.status(201).send(response);
    } catch (error) {
        res.status(400).send({'message': 'Error al itentar agregar producto al carrito', error})
    }
}

/**
 * GET productos de carrito
 * 
 * @param req Express Request
 * @param res Express Response
 */
export const getProductosCarrito = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const response = await ProductoCarrito.findAll({
            where: {
                idCarrito: id
            }
        });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({'message': 'Error al itentar obtener los productos del carrito', error})
    }
}


/**
 * PUT modificar producto carrito
 * 
 * @param req Express Request
 * @param res Express Response
 */
export const updateProductoCarrito = async (req: Request, res: Response) => {
    try {
        const body = {
            cantidad: req.body.cantidad
        };

        const { id } = req.params;


        const producto = await ProductoCarrito.findByPk(id);

        if (!producto) {
            return [false, `No existe un producto con el id ${id}`];
        }

        const validateResponse = await validateUpdateProducto(body, producto);

        if (!validateResponse[0]) {
            res.status(400).send({'message': validateResponse[1]});
            return;
        }

        const response = await producto.update(body);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({'message': 'Error al itentar obtener los productos del carrito', error})
    }
}

/**
 * DELETE elminar producto carrito
 * 
 * @param req Express Request
 * @param res Express Response
 */
export const deleteProductoCarrito = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;


        const producto = await ProductoCarrito.findByPk(id);

        if (!producto) {
            return [false, `No existe un producto con el id ${id}`];
        }

        const response = await producto.destroy();
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({'message': 'Error al itentar obtener los productos del carrito', error})
    }
}