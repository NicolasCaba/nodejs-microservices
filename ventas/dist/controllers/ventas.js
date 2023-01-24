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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVentas = exports.createVenta = void 0;
const sequelize_1 = require("sequelize");
const venta_1 = __importDefault(require("../models/venta"));
const productoVenta_1 = __importDefault(require("../models/productoVenta"));
const productoVenta_2 = require("./productoVenta");
/**
 * POST create venta
 *
 * @param req Express Request
 * @param res Express Response
 */
const createVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { body } = req;
        const body = {
            idCliente: req.body.idCliente,
            total: req.body.total,
            metodoDePago: req.body.metodoDePago,
            fecha: req.body.fecha,
            productosVenta: req.body.productosVenta
        };
        const { productosVenta } = body, bodyVenta = __rest(body, ["productosVenta"]);
        const responseCreateVenta = yield venta_1.default.create(bodyVenta);
        for (let producto of productosVenta) {
            producto.idVenta = responseCreateVenta.id;
        }
        const responseCreateProductoVenta = yield (0, productoVenta_2.createProductoVenta)(productosVenta);
        res.status(200).send({ 'venta': responseCreateVenta, 'productosVenta': responseCreateProductoVenta });
    }
    catch (error) {
        res.status(500).send({ message: `No se pudo crear el reporte de venta`, error });
    }
});
exports.createVenta = createVenta;
/**
 * POST get ventas
 *
 * @param req Express Request
 * @param res Express Response
 */
const getVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryFilter = req.query.fecha;
        let filter = {};
        filter.include = [productoVenta_1.default];
        if (queryFilter) {
            filter.where = {
                fecha: {
                    [sequelize_1.Op.eq]: `${queryFilter}`,
                },
            };
        }
        ;
        const response = yield venta_1.default.findAll();
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send({ message: `No se pudo obtener el reporte de ventas`, error });
    }
});
exports.getVentas = getVentas;
