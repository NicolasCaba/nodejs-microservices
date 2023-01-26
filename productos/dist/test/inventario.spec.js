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
describe('GET /api/inventario', () => {
    // Peticion correcta
    test('Debe responder con un status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/inventario').send();
        expect(response.statusCode).toBe(200);
    }));
    // Peticion correcta veficando que responda un arreglo
    test('Debe responder con un arreglo de Inventarios', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/inventario').send();
        expect(response.body).toBeInstanceOf(Array);
    }));
});
describe('GET /api/inventario/:id', () => {
    // Peticion correcta
    test('Debe responder con un status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/inventario/1').send();
        expect(response.statusCode).toBe(200);
    }));
    // Retorno del objeto correspondiente al inventario
    test('Debe responder con un Objeto Inventario', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/inventario/1').send();
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('producto');
    }));
    // Peticion un id que no es de tipo numerico
    test('Debe responder con un status code 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/inventario/true').send();
        expect(response.statusCode).toBe(400);
    }));
    // Peticion con un id que no existe
    test('Debe responder con un status code 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/inventario/1000000').send();
        expect(response.statusCode).toBe(404);
    }));
});
describe('POST /api/inventario', () => {
    // Test con un parametro faltante
    test('Debe responder con un status code 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/inventario')
            .send({ idProducto: 2 });
        expect(response.statusCode).toBe(400);
    }));
    // Test con un parametro del un tipo que no corresponde
    test('Debe responder con un status code 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/inventario')
            .send({ idProducto: false, stock: 4 });
        expect(response.statusCode).toBe(400);
    }));
    // Test de una request correcta
    test('Debe responder con un status code 201', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/inventario')
            .send({ idProducto: 4, stock: 8 });
        expect(response.statusCode).toBe(201);
    }));
});
