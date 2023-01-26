"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductoCarrito = exports.updateProductoCarrito = exports.getProductosCarrito = exports.createProductoCarrito = void 0;
const productoCarrito_1 = __importDefault(require("../models/productoCarrito"));
const productoCarritoStockCupo_1 = require("../validators/productoCarritoStockCupo");
/**
 * POST create producto carrito
 *
 * @param req Express Request
 * @param res Express Response
 */
const createProductoCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = {
            idProducto: req.body.idProducto,
            idCarrito: req.body.idCarrito,
            cantidad: req.body.cantidad
        };
        const validateResponse = yield (0, productoCarritoStockCupo_1.vaidateCreateProducto)(body);
        if (!validateResponse[0]) {
            res.status(400).send({ 'message': validateResponse[1] });
            return;
        }
        const response = yield productoCarrito_1.default.create(body);
        res.status(201).send(response);
    }
    catch (error) {
        res.status(400).send({ 'message': 'Error al itentar agregar producto al carrito', error });
    }
});
exports.createProductoCarrito = createProductoCarrito;
/**
 * GET productos de carrito
 *
 * @param req Express Request
 * @param res Express Response
 */
const getProductosCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield productoCarrito_1.default.findAll({
            where: {
                idCarrito: id
            }
        });
        if (response.length === 0) {
            res.status(404).send({ 'message': `No existen productos dentro del carrito` });
            return;
        }
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send({ 'message': 'Error al itentar obtener los productos del carrito', error });
    }
});
exports.getProductosCarrito = getProductosCarrito;
/**
 * PUT modificar producto carrito
 *
 * @param req Express Request
 * @param res Express Response
 */
const updateProductoCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = {
            cantidad: req.body.cantidad
        };
        const { id } = req.params;
        const producto = yield productoCarrito_1.default.findByPk(id);
        if (!producto) {
            res.status(400).send({ 'message': `No existe un producto con el id ${id}` });
            return;
        }
        const validateResponse = yield (0, productoCarritoStockCupo_1.validateUpdateProducto)(body, producto);
        if (!validateResponse[0]) {
            res.status(400).send({ 'message': validateResponse[1] });
            return;
        }
        const response = yield producto.update(body);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send({ 'message': 'Error al itentar obtener los productos del carrito', error });
    }
});
exports.updateProductoCarrito = updateProductoCarrito;
/**
 * DELETE elminar producto carrito
 *
 * @param req Express Request
 * @param res Express Response
 */
const deleteProductoCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const producto = yield productoCarrito_1.default.findByPk(id);
        if (!producto) {
            res.status(400).send({ 'message': `No existe un producto con el id ${id}` });
            return;
        }
        const response = yield producto.destroy();
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send({ 'message': 'Error al itentar obtener los productos del carrito', error });
    }
});
exports.deleteProductoCarrito = deleteProductoCarrito;
