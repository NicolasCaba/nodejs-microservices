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
exports.validateUpdateProducto = exports.vaidateCreateProducto = void 0;
const axios_1 = __importDefault(require("axios"));
const carrito_1 = __importDefault(require("../models/carrito"));
const productoCarrito_1 = __importDefault(require("../models/productoCarrito"));
const getCarrito = (idCarrito) => __awaiter(void 0, void 0, void 0, function* () {
    const carrito = yield carrito_1.default.findByPk(idCarrito);
    if (!carrito) {
        return [false, `El carrito con el id especificado no existe`];
    }
    return carrito;
});
const getProductosCarrito = (idCarrito) => __awaiter(void 0, void 0, void 0, function* () {
    const productosCarrito = yield productoCarrito_1.default.findAll({
        where: {
            idCarrito: idCarrito
        }
    });
    let cantidadProductosEnElCarrito = 0;
    if (productosCarrito) {
        for (let i = 0; i < productosCarrito.length; i++) {
            cantidadProductosEnElCarrito += productosCarrito[i].cantidad;
        }
    }
    return [productosCarrito, cantidadProductosEnElCarrito];
});
const getInventario = (idProducto) => __awaiter(void 0, void 0, void 0, function* () {
    const inventario = yield axios_1.default.get(`http://localhost:3000/api/producto/${idProducto}`);
    if (!inventario.data) {
        return [false, `El id del producto no existe`];
    }
    if (!inventario.data.inventario) {
        return [false, `El producto que esta intentando agregar no cuenta con inventario`];
    }
    return inventario;
});
const getCliente = (idCliente) => __awaiter(void 0, void 0, void 0, function* () {
    const cliente = yield axios_1.default.get(`http://localhost:3002/api/clientes/${idCliente}`);
    return cliente;
});
const vaidateCreateProducto = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const carrito = yield carrito_1.default.findByPk(body.idCarrito);
    if (!carrito) {
        return [false, `El carrito con el id especificado no existe`];
    }
    const productosCarrito = yield productoCarrito_1.default.findAll({
        where: {
            idCarrito: body.idCarrito
        }
    });
    let indexProducto = productosCarrito.find((producto) => producto.idProducto === body.idProducto);
    if (indexProducto) {
        return [false, `El producto que intenta agregar al carrito ya existe, intente modificandolo`];
    }
    let cantidadProductosEnElCarrito = 0;
    if (productosCarrito) {
        for (let i = 0; i < productosCarrito.length; i++) {
            cantidadProductosEnElCarrito += productosCarrito[i].cantidad;
        }
    }
    const cliente = yield axios_1.default.get(`http://localhost:3002/api/clientes/${carrito === null || carrito === void 0 ? void 0 : carrito.idCliente}`);
    const inventario = yield axios_1.default.get(`http://localhost:3000/api/producto/${body.idProducto}`);
    if (!inventario.data) {
        return [false, `El id del producto no existe`];
    }
    if (!inventario.data.inventario) {
        return [false, `El producto que esta intentando agregar no cuenta con inventario`];
    }
    if (cliente.data.cupo < body.cantidad + cantidadProductosEnElCarrito) {
        return [false, `La cantidad que esta intentando agregar sobrepasa el cupo de compra del cliente`];
    }
    if (inventario.data.inventario.stock < body.cantidad + cantidadProductosEnElCarrito) {
        return [false, `La cantidad que esta intentando agregar sobrepasa el stock en inventario del producto`];
    }
    return [true, null];
});
exports.vaidateCreateProducto = vaidateCreateProducto;
const validateUpdateProducto = (body, productoCarrito) => __awaiter(void 0, void 0, void 0, function* () {
    const productosCarrito = yield productoCarrito_1.default.findAll({
        where: {
            idCarrito: productoCarrito.idCarrito
        }
    });
    let cantidadProductosEnElCarrito = 0;
    if (productosCarrito) {
        for (let i = 0; i < productosCarrito.length; i++) {
            if (productosCarrito[i].id !== productoCarrito.id) {
                cantidadProductosEnElCarrito += productosCarrito[i].cantidad;
            }
        }
    }
    const carrito = yield carrito_1.default.findByPk(productoCarrito.idCarrito);
    const cliente = yield axios_1.default.get(`http://localhost:3002/api/clientes/${carrito === null || carrito === void 0 ? void 0 : carrito.idCliente}`);
    const inventarioProducto = yield axios_1.default.get(`http://localhost:3000/api/producto/${productoCarrito.idProducto}`);
    if (cliente.data.cupo < body.cantidad + cantidadProductosEnElCarrito) {
        return [false, `La cantidad que esta intentando agregar sobrepasa el cupo de compra del cliente`];
    }
    if (inventarioProducto.data.inventario.stock < body.cantidad + cantidadProductosEnElCarrito) {
        return [false, `La cantidad que esta intentando agregar sobrepasa el stock en inventario del producto`];
    }
    return [true, null];
});
exports.validateUpdateProducto = validateUpdateProducto;
