"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetProductoById = void 0;
const express_validator_1 = require("express-validator");
exports.validateGetProductoById = [
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
