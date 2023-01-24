import { Router } from "express";

// Controllers
import { createCarrito } from "../controllers/carrito";
import { createProductoCarrito, deleteProductoCarrito, getProductosCarrito, updateProductoCarrito } from "../controllers/productoCarrito";

const router = Router();

/**
 * POST
 * Crear carrito a un cliente
 */
router.post('/carrito', createCarrito);

/**
 * GET
 * Listado de productos del carrito
 * Recibe param 'id' del carrito
 */
router.get('/carrito/productos/:id', getProductosCarrito);

/**
 * POST
 * Agregar producto al carrito
 */
router.post('/carrito/productos', createProductoCarrito);

/**
 * PUT
 * Actualizar productos en el carrito
 * Recibe param 'id' del productoCarrito
 */
router.put('/carrito/productos/:id', updateProductoCarrito);

/**
 * DELETE
 * Quitar productos del carrito
 * Recibe param 'id' del productoCarrito
 */
router.delete('/carrito/productos/:id', deleteProductoCarrito);




export default router;