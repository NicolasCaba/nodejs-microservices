import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export const validateCreateCarrito = [
  check('idCliente', 'El campo id cliente debe existir y ser un número')
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
