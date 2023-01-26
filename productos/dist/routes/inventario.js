"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controllers
const inventario_1 = require("../controllers/inventario");
// Middleware validator
const inventarioValidator_1 = require("../validators/inventarioValidator");
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
router.post('/inventario', inventarioValidator_1.validateCreateInventario, inventario_1.createInventario);
/**
 * GET
 * Obtener un inventario por id
 */
router.get('/inventario/:id', inventarioValidator_1.validateGetInventarioById, inventario_1.getInventarioById);
exports.default = router;
