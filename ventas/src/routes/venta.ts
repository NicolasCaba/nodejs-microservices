import { Router } from "express";

// Controller
import { getVentas, createVenta } from "../controllers/ventas";

// Middleware
import { validateCreateVenta } from "../validators/ventaValidator";


const router = Router();

/**
 * POST
 * Pagar productos del carrito
 */
router.post('/venta', validateCreateVenta, createVenta);

/**
 * GET
 * Reporte de ventas
 */
router.get('/venta', getVentas);


export default router;