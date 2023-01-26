import { Router } from "express";

// Controllers
import { getInventario, createInventario, getInventarioById } from "../controllers/inventario";

// Middleware validator
import { validateCreateInventario, validateGetInventarioById } from '../validators/inventarioValidator';

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
router.post('/inventario', validateCreateInventario, createInventario);

/**
 * GET
 * Obtener un inventario por id
 */
router.get('/inventario/:id', validateGetInventarioById, getInventarioById)


export default router;