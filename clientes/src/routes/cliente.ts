import { Router } from "express";

// Controllers
import { getClientes, getClienteById } from "../controllers/cliente"

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
router.get('/clientes/:id', getClienteById);


export default router;