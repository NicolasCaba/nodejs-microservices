import { Router } from "express";

// Controllers
import { createCarrito } from "../controllers/carrito";
import { createProductoCarrito, deleteProductoCarrito, getProductosCarrito, updateProductoCarrito } from "../controllers/productoCarrito";


// Middlewares
import { validateCreateCarrito } from '../validators/carritoValidator';
import { validateCreateProductoCarrito, validateGetAndDeleteProductoCarrito, validateUpdateProductoCarrito } from '../validators/productoCarritoValidator';

const router = Router();

/**
 * POST
 * Crear carrito a un cliente
 */
router.post('/carrito', validateCreateCarrito, createCarrito);

/**
 * GET
 * Listado de productos del carrito
 * Recibe param 'id' del carrito
 */
router.get('/carrito/productos/:id', validateGetAndDeleteProductoCarrito, getProductosCarrito);

/**
 * POST
 * Agregar producto al carrito
 */
router.post('/carrito/productos', validateCreateProductoCarrito, createProductoCarrito);

/**
 * PUT
 * Actualizar productos en el carrito
 * Recibe param 'id' del productoCarrito
 */
router.put('/carrito/productos/:id', validateUpdateProductoCarrito, updateProductoCarrito);

/**
 * DELETE
 * Quitar productos del carrito
 * Recibe param 'id' del productoCarrito
 */
router.delete('/carrito/productos/:id', validateGetAndDeleteProductoCarrito, deleteProductoCarrito);




export default router;