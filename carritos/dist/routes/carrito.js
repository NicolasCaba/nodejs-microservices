"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controllers
const carrito_1 = require("../controllers/carrito");
const productoCarrito_1 = require("../controllers/productoCarrito");
// Middlewares
const carritoValidator_1 = require("../validators/carritoValidator");
const productoCarritoValidator_1 = require("../validators/productoCarritoValidator");
const router = (0, express_1.Router)();
/**
 * POST
 * Crear carrito a un cliente
 */
router.post('/carrito', carritoValidator_1.validateCreateCarrito, carrito_1.createCarrito);
/**
 * GET
 * Listado de productos del carrito
 * Recibe param 'id' del carrito
 */
router.get('/carrito/productos/:id', productoCarritoValidator_1.validateGetAndDeleteProductoCarrito, productoCarrito_1.getProductosCarrito);
/**
 * POST
 * Agregar producto al carrito
 */
router.post('/carrito/productos', productoCarritoValidator_1.validateCreateProductoCarrito, productoCarrito_1.createProductoCarrito);
/**
 * PUT
 * Actualizar productos en el carrito
 * Recibe param 'id' del productoCarrito
 */
router.put('/carrito/productos/:id', productoCarritoValidator_1.validateUpdateProductoCarrito, productoCarrito_1.updateProductoCarrito);
/**
 * DELETE
 * Quitar productos del carrito
 * Recibe param 'id' del productoCarrito
 */
router.delete('/carrito/productos/:id', productoCarritoValidator_1.validateGetAndDeleteProductoCarrito, productoCarrito_1.deleteProductoCarrito);
exports.default = router;
