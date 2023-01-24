"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controllers
const inventario_1 = require("../controllers/inventario");
const router = (0, express_1.Router)();
/**
 * GET
 * Listado de inventario de productos
 */
router.get('/inventario', inventario_1.getInventario);
/**
 * POST
 * Agregar inventario de productos
 */
router.post('/inventario', inventario_1.createInventario);
/**
 * GET
 * Obtener un inventario por id
 */
router.get('/inventario/:id', inventario_1.getInventarioById);
exports.default = router;
