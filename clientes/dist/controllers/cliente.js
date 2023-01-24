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
exports.getClienteById = exports.getClientes = void 0;
const cliente_1 = __importDefault(require("../models/cliente"));
/**
 * GET All clientes
 *
 * @param req Express Require
 * @param res Express Response
 */
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield cliente_1.default.findAll();
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send({ 'message': 'Error al itentar obtener los clientes', error });
    }
});
exports.getClientes = getClientes;
/**
 * GET cliente by id
 *
 * @param req Express Require
 * @param res Express Response
 */
const getClienteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield cliente_1.default.findByPk(id);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send({ 'message': 'Error al itentar obtener cliente por id', error });
    }
});
exports.getClienteById = getClienteById;
