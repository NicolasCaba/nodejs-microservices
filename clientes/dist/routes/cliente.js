"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controllers
const cliente_1 = require("../controllers/cliente");
const router = (0, express_1.Router)();
/**
 * GET
 * Obtener todos los clientes
 */
router.get('/clientes', cliente_1.getClientes);
/**
 * GET
 * Obtener cliente por id
 */
router.get('/clientes/:id', cliente_1.getClienteById);
exports.default = router;
