import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { param } from 'express-validator/src/middlewares/validation-chain-builders';

export const validateGetProductoById = [
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
