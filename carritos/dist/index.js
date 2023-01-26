"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressServer = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const expressServer_1 = __importDefault(require("./expressServer"));
// environment vars config
dotenv_1.default.config();
exports.expressServer = new expressServer_1.default();
exports.expressServer.listen();
