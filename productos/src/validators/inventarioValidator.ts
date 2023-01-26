import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { param } from 'express-validator/src/middlewares/validation-chain-builders';

export const validateCreateInventario = [
  check('idProducto', 'El campo id producto debe existir y ser un número')
    .exists()
    .notEmpty()
    .isInt(),
  check('stock', 'El campo stock debe existir y ser un número')
    .exists()
    .notEmpty()
    .isInt(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(400).send({ validationError: error });
    }
  },
];

export const validateGetInventarioById = [
  param('id', 'El paramentro id debe ser un número')
    .exists()
    .notEmpty()
    .isInt(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(400).send({ validationError: error });
    }
  },
];
