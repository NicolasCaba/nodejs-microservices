import { NextFunction, Request, Response } from 'express';
import { check, param, validationResult } from 'express-validator';

export const validateCreateProductoCarrito = [
  check('idProducto', 'El campo id producto debe existir y ser un número')
    .exists()
    .notEmpty()
    .isInt(),
  check('idCarrito', 'El campo id carrito debe existir y ser un número')
    .exists()
    .notEmpty()
    .isInt(),
  check('cantidad', 'El campo cantidad debe existir y ser un número')
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

export const validateGetAndDeleteProductoCarrito = [
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

export const validateUpdateProductoCarrito = [
  param('id', 'El paramentro id debe ser un número')
    .exists()
    .notEmpty()
    .isInt(),
  check('cantidad', 'El campo cantidad debe existir y ser un número')
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
