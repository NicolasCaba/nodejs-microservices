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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const cliente_1 = __importDefault(require("./routes/cliente"));
class ExpressServer {
    constructor() {
        this.basePath = '/api';
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3002';
        this.dbConnection();
        this.configs();
        this.routes();
        this.modelEntityRelationship();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbConnection_1.default.authenticate();
                console.log('Conexion con la base de datos establecida.');
            }
            catch (error) {
                throw new Error(`Error en la conexion a la base de datos: ${error}`);
            }
        });
    }
    configs() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    modelEntityRelationship() {
    }
    routes() {
        this.app.use(this.basePath, cliente_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App corriendo en puerto ${this.port}`);
        });
    }
    getApp() {
        return this.app;
    }
}
exports.default = ExpressServer;
