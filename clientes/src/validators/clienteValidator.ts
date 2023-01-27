import { NextFunction, Request, Response } from 'express';
import { validationResult, param } from 'express-validator';

export const validateGetClienteById = [
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