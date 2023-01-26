"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controllers
const producto_1 = require("../controllers/producto");
// Middlewares
const productoValidator_1 = require("../validators/productoValidator");
const router = (0, express_1.Router)();
/**
 * GET
 * Obtener un producto por id
 */
router.get('/producto/:id', productoValidator_1.validateGetProductoById, producto_1.getProductoById);
exports.default = router;
