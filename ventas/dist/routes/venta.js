"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controller
const ventas_1 = require("../controllers/ventas");
const router = (0, express_1.Router)();
/**
 * POST
 * Pagar productos del carrito
 */
router.post('/venta', ventas_1.createVenta);
/**
 * GET
 * Reporte de ventas
 */
router.get('/venta', ventas_1.getVentas);
exports.default = router;
