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
const supertest_1 = __importDefault(require("supertest"));
const expressServer_1 = __importDefault(require("../expressServer"));
const app = new expressServer_1.default().getApp();
describe('GET /api/venta', () => {
    // Peticion correcta
    test('Debe responder con un status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/venta').send();
        expect(response.statusCode).toBe(200);
    }));
    // Retorno del objeto correspondiente al venta
    test('Debe responder con un Objeto venta', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/venta').send();
        expect(response.body).toBeInstanceOf(Array);
    }));
});
describe('POST /api/venta', () => {
    // Peticion sin body
    test('Debe responder con un status code 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/api/venta').send();
        expect(response.statusCode).toBe(400);
    }));
    // Peticion con parametros del body faltantes
    test('Debe responder con un status code 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/venta')
            .send({
            idCliente: 2,
            fecha: '2023-01-24',
            productosVenta: [
                {
                    idProducto: 2,
                    cantidad: 1,
                },
                {
                    idProducto: 3,
                    cantidad: 3,
                },
            ],
        });
        expect(response.statusCode).toBe(400);
    }));
    // Peticion con parametros del body de tipos que no corresponden
    test('Debe responder con un status code 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/venta')
            .send({
            idCliente: 'Hola mundo',
            total: true,
            metodoDePago: 'tarjeta',
            fecha: '2023-01-24',
            productosVenta: [
                {
                    idProducto: 2,
                    cantidad: 1,
                },
                {
                    idProducto: 3,
                    cantidad: 3,
                },
            ],
        });
        expect(response.statusCode).toBe(400);
    }));
    // Peticion correcta
    test('Debe responder con un status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/venta')
            .send({
            idCliente: 2,
            total: 9898023,
            metodoDePago: 'tarjeta',
            fecha: '2023-01-27',
            productosVenta: [
                {
                    idProducto: 2,
                    cantidad: 1,
                },
                {
                    idProducto: 3,
                    cantidad: 3,
                },
            ],
        });
        expect(response.statusCode).toBe(200);
    }));
});
