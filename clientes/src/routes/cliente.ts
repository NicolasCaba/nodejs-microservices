import { Router } from "express";

// Controllers
import { getClientes, getClienteById } from "../controllers/cliente"

// Middlewares
import { validateGetClienteById } from "../validators/clienteValidator";

const router = Router();

/**
 * GET
 * Obtener todos los clientes
 */
router.get('/clientes', getClientes);

/**
 * GET
 * Obtener cliente por id
 */
router.get('/clientes/:id', validateGetClienteById, getClienteById);


export default router;