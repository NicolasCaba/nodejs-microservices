import { Router } from "express";

// Controllers
import { getProductoById } from "../controllers/producto";

// Middlewares
import { validateGetProductoById } from '../validators/productoValidator';


const router = Router();


/**
 * GET
 * Obtener un producto por id
 */
router.get('/producto/:id', validateGetProductoById, getProductoById);


export default router;
