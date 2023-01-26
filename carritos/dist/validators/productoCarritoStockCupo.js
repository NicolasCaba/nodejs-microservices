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
/**
 * Obtener datos del carrito
 *
 * @param idCarrito id del carrito
 * @returns Promise<CarritoInstance | string>
 */
const getCarrito = (idCarrito) => __awaiter(void 0, void 0, void 0, function* () {
    const carrito = yield carrito_1.default.findByPk(idCarrito);
    if (!carrito) {
        return `El carrito con el id especificado no existe`;
    }
    return carrito;
});
/**
 * Obtener la lista de productos dentro del carrito y la cantidad de los mismos
 *
 * @param idCarrito id del carrito
 * @returns Promise<[ProductoCarritoInstance[], number]>
 */
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
/**
 * Obtener la lista de productos dentro del carrito y la cantidad de los mismos excluyendo la cantidad del producto a acutalizar
 *
 * @param idCarrito id del carrito
 * @param idProductoCarrito id del producto carrito a actualizar
 * @returns Promise<[ProductoCarritoInstance[], number]>
 */
const getProductosCarritoUpdate = (idCarrito, idProductoCarrito) => __awaiter(void 0, void 0, void 0, function* () {
    const productosCarrito = yield productoCarrito_1.default.findAll({
        where: {
            idCarrito: idCarrito
        }
    });
    let cantidadProductosEnElCarrito = 0;
    if (productosCarrito) {
        for (let i = 0; i < productosCarrito.length; i++) {
            if (productosCarrito[i].id !== idProductoCarrito) {
                cantidadProductosEnElCarrito += productosCarrito[i].cantidad;
            }
        }
    }
    return [productosCarrito, cantidadProductosEnElCarrito];
});
/**
 * Obtener datos del inventario
 *
 * @param idProducto id del producto
 * @returns Promise<AxiosResponse | string>
 */
const getInventario = (idProducto) => __awaiter(void 0, void 0, void 0, function* () {
    const inventario = yield axios_1.default.get(`http://localhost:3000/api/producto/${idProducto}`);
    if (!inventario.data) {
        return `El id del producto no existe`;
    }
    if (!inventario.data.inventario) {
        return `El producto que esta intentando agregar no cuenta con inventario`;
    }
    return inventario;
});
/**
 * Obtener datos del cliente
 *
 * @param idCliente id del cliente
 * @returns Promise<AxiosResponse> de cliente
 */
const getCliente = (idCliente) => __awaiter(void 0, void 0, void 0, function* () {
    const cliente = yield axios_1.default.get(`http://localhost:3002/api/clientes/${idCliente}`);
    return cliente;
});
const vaidateCreateProducto = (body) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtener el carrito
    const carrito = yield getCarrito(body.idCarrito);
    if (typeof carrito === 'string') {
        return [false, carrito];
    }
    // Obtener productos dentro del carrito y su cantidad
    const [productosCarrito, cantidadProductosEnElCarrito] = yield getProductosCarrito(body.idCarrito);
    let indexProducto = productosCarrito.find((producto) => producto.idProducto === body.idProducto);
    if (indexProducto) {
        return [false, `El producto que intenta agregar al carrito ya existe, intente modificandolo`];
    }
    // Obtener cliente
    const cliente = yield getCliente(carrito === null || carrito === void 0 ? void 0 : carrito.idCliente);
    // Obtener inventario del producto
    const inventario = yield getInventario(body.idProducto);
    if (typeof inventario === 'string') {
        return [false, inventario];
    }
    // Verificar el cupo de compra del cliente y el stock del producto con respecto a la cantidad a agregar al carrito
    if (cliente.data.cupo < body.cantidad + cantidadProductosEnElCarrito) {
        return [false, `La cantidad que esta intentando agregar sobrepasa el cupo de compra del cliente`];
    }
    if (inventario.data.inventario.stock < body.cantidad) {
        return [false, `La cantidad que esta intentando agregar sobrepasa el stock en inventario del producto`];
    }
    // Todas las validaciones correctas
    return [true, null];
});
exports.vaidateCreateProducto = vaidateCreateProducto;
const validateUpdateProducto = (body, productoCarrito) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtener el carrito
    const carrito = yield getCarrito(productoCarrito.idCarrito);
    if (typeof carrito === 'string') {
        return [false, carrito];
    }
    // Obtener productos dentro del carrito y su cantidad
    const [productosCarrito, cantidadProductosEnElCarrito] = yield getProductosCarritoUpdate(productoCarrito.idCarrito, productoCarrito.id);
    console.log();
    // Obtener cliente
    const cliente = yield getCliente(carrito === null || carrito === void 0 ? void 0 : carrito.idCliente);
    // Obtener inventario del producto
    const inventario = yield getInventario(productoCarrito.idProducto);
    if (typeof inventario === 'string') {
        return [false, inventario];
    }
    // Verificar el cupo de compra del cliente y el stock del producto con respecto a la cantidad a agregar al carrito
    if (cliente.data.cupo < body.cantidad + cantidadProductosEnElCarrito) {
        return [false, `La cantidad que esta intentando agregar sobrepasa el cupo de compra del cliente`];
    }
    if (inventario.data.inventario.stock < body.cantidad) {
        return [false, `La cantidad que esta intentando agregar sobrepasa el stock en inventario del producto`];
    }
    return [true, null];
});
exports.validateUpdateProducto = validateUpdateProducto;
