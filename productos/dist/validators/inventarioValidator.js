"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetInventarioById = exports.validateCreateInventario = void 0;
const express_validator_1 = require("express-validator");
const validation_chain_builders_1 = require("express-validator/src/middlewares/validation-chain-builders");
exports.validateCreateInventario = [
    (0, express_validator_1.check)('idProducto', 'El campo id producto debe existir y ser un número')
        .exists()
        .notEmpty()
        .isInt(),
    (0, express_validator_1.check)('stock', 'El campo stock debe existir y ser un número')
        .exists()
        .notEmpty()
        .isInt(),
    (req, res, next) => {
        try {
            (0, express_validator_1.validationResult)(req).throw();
            return next();
        }
        catch (error) {
            res.status(400).send({ validationError: error });
        }
    },
];
exports.validateGetInventarioById = [
    (0, validation_chain_builders_1.param)('id', 'El paramentro id debe ser un número')
        .exists()
        .notEmpty()
        .isInt(),
    (req, res, next) => {
        try {
            (0, express_validator_1.validationResult)(req).throw();
            return next();
        }
        catch (error) {
            res.status(400).send({ validationError: error });
        }
    },
];
