"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateVenta = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateVenta = [
    (0, express_validator_1.check)('idCliente', 'El campo id cliente debe existir y ser un número')
        .exists()
        .notEmpty()
        .isInt(),
    (0, express_validator_1.check)('total', 'El campo total debe existir y ser un número')
        .exists()
        .notEmpty()
        .isNumeric(),
    (0, express_validator_1.check)('metodoDePago', 'El campo metodo de pago debe existir')
        .exists()
        .notEmpty()
        .isString(),
    (0, express_validator_1.check)('fecha', 'El campo fecha debe existir y ser una fecha valida')
        .exists()
        .notEmpty()
        .isDate(),
    (0, express_validator_1.check)('metodoDePago', 'El campo metodo de pago debe existir')
        .exists()
        .notEmpty()
        .isString(),
    (0, express_validator_1.check)('productosVenta', 'El campo productos venta debe existir y contener al menos un producto')
        .exists()
        .notEmpty()
        .isArray(),
    (0, express_validator_1.check)('productosVenta.*.idProducto', 'El campo de producto id producto debe existir y ser un número')
        .exists()
        .notEmpty()
        .isInt(),
    (0, express_validator_1.check)('productosVenta.*.cantidad', 'El campo de producto cantidad debe existir y ser un número')
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
