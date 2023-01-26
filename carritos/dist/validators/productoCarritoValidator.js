"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateProductoCarrito = exports.validateGetAndDeleteProductoCarrito = exports.validateCreateProductoCarrito = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateProductoCarrito = [
    (0, express_validator_1.check)('idProducto', 'El campo id producto debe existir y ser un número')
        .exists()
        .notEmpty()
        .isInt(),
    (0, express_validator_1.check)('idCarrito', 'El campo id carrito debe existir y ser un número')
        .exists()
        .notEmpty()
        .isInt(),
    (0, express_validator_1.check)('cantidad', 'El campo cantidad debe existir y ser un número')
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
exports.validateGetAndDeleteProductoCarrito = [
    (0, express_validator_1.param)('id', 'El paramentro id debe ser un número')
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
exports.validateUpdateProductoCarrito = [
    (0, express_validator_1.param)('id', 'El paramentro id debe ser un número')
        .exists()
        .notEmpty()
        .isInt(),
    (0, express_validator_1.check)('cantidad', 'El campo cantidad debe existir y ser un número')
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
