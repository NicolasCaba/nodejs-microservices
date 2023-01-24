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
exports.getInventarioById = exports.createInventario = exports.getInventario = void 0;
const inventario_1 = __importDefault(require("../models/inventario"));
const producto_1 = __importDefault(require("../models/producto"));
/**
 * GET All inventario
 *
 * @param req Express Request
 * @param res Express Response
 */
const getInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield inventario_1.default.findAll({
            include: [producto_1.default]
        });
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send({ 'message': 'Error al intentar obtener inventario', error });
    }
});
exports.getInventario = getInventario;
/**
 * POST create inventario
 *
 * @param req Express Request
 * @param res Express Response
 */
const createInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const response = yield inventario_1.default.create(body);
        res.status(201).send(response);
    }
    catch (error) {
        res.status(400).send({ 'message': 'Error al intentar obtener inventario', error });
    }
});
exports.createInventario = createInventario;
/**
 * GET get inventario by id
 *
 * @param req Express Request
 * @param res Express Response
 */
const getInventarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield inventario_1.default.findByPk(id, {
            include: [producto_1.default]
        });
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send({ 'message': 'Error al intentar obtener inventario por id', error });
    }
});
exports.getInventarioById = getInventarioById;
