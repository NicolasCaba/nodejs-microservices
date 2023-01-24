import { Router } from "express";

// Controllers
import { getProductoById } from "../controllers/producto";


const router = Router();


/**
 * GET
 * Obtener un producto por id
 */
router.get('/producto/:id', getProductoById);


export default router;
