"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controllers
const producto_1 = require("../controllers/producto");
const router = (0, express_1.Router)();
/**
 * GET
 * Obtener un producto por id
 */
router.get('/producto/:id', producto_1.getProductoById);
exports.default = router;
