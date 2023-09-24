import { Request, Response, NextFunction } from "express";
import ValidatorSchemas from "../validators/validator.schemas";

type ValidatorKeys = keyof typeof ValidatorSchemas;

export const Validator = (validator: ValidatorKeys) => {
  if (!ValidatorSchemas.hasOwnProperty(validator))
    throw new Error(`'${validator}' does not exist`);
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const validated = await ValidatorSchemas[validator].validateAsync(
        req.body
      );
      req.body = validated;
      next();
    } catch (err: any) {
      if (err.isJoi) return res.status(422).json({ message: err.message });
      return res.status(500).json({ message: err.message });
    }
  };
};
