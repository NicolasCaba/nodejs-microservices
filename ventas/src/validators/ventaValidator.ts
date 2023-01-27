import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export const validateCreateVenta = [
  check('idCliente', 'El campo id cliente debe existir y ser un número')
    .exists()
    .notEmpty()
    .isInt(),
  check('total', 'El campo total debe existir y ser un número')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('metodoDePago', 'El campo metodo de pago debe existir')
    .exists()
    .notEmpty()
    .isString(),
  check('fecha', 'El campo fecha debe existir y ser una fecha valida')
    .exists()
    .notEmpty()
    .isDate(),
  check('metodoDePago', 'El campo metodo de pago debe existir')
    .exists()
    .notEmpty()
    .isString(),
  check(
    'productosVenta',
    'El campo productos venta debe existir y contener al menos un producto'
  )
    .exists()
    .notEmpty()
    .isArray(),
  check(
    'productosVenta.*.idProducto',
    'El campo de producto id producto debe existir y ser un número'
  )
    .exists()
    .notEmpty()
    .isInt(),
  check(
    'productosVenta.*.cantidad',
    'El campo de producto cantidad debe existir y ser un número'
  )
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
