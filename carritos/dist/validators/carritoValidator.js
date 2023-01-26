"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateCarrito = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateCarrito = [
    (0, express_validator_1.check)('idCliente', 'El campo id cliente debe existir y ser un número')
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
