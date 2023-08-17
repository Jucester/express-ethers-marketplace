import z from 'zod';
import express, { NextFunction, Request, Response } from 'express';

const validate = <T extends Object>(data: T, schema: z.ZodType<T>) => {
    const result = schema.safeParse(data);
    return result.success ? result.success : result.error;
};

type Check = keyof express.Request;

const validationHandler =
    <T extends Object>(schema: z.ZodType<T>, check: Check = 'body') =>
    (req: Request, res: Response, next: NextFunction) => {
        const validation = validate(req[check], schema);
    
        return validation instanceof z.ZodError
            ? res.status(400).json({
                  statusCode: 400,
                  response: validation,
              })
            : next();
    };

export default validationHandler;
