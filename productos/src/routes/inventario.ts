import { Router } from "express";

// Controllers
import { getInventario, createInventario, getInventarioById } from "../controllers/inventario";


const router = Router();

/**
 * GET
 * Listado de inventario de productos
 */
router.get('/inventario', getInventario);

/**
 * POST
 * Agregar inventario de productos
 */
router.post('/inventario', createInventario);

/**
 * GET
 * Obtener un inventario por id
 */
router.get('/inventario/:id', getInventarioById)


export default router;