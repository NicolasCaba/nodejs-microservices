import { Router } from "express";

// Controller
import { getVentas, createVenta } from "../controllers/ventas";

const router = Router();

/**
 * POST
 * Pagar productos del carrito
 */
router.post('/venta', createVenta);

/**
 * GET
 * Reporte de ventas
 */
router.get('/venta', getVentas);


export default router;