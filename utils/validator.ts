import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { HTTP } from "./enums";

export default (schema: ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error === undefined) {
      next();
    } else {
      return res
        .status(HTTP.BAD_REQUEST)
        .json({ error: error.details[0].message });
    }
  };
};
