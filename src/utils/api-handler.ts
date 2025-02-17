import { Request, Response, NextFunction, RequestHandler } from "express";
import { z, ZodSchema } from "zod";

type HandlerFunction<T> = (args: {
  req: Request;
  res: Response;
  params: T;
}) => Promise<void>; // Ensure return type is `Promise<void>`

export function apiHandler<T extends ZodSchema<any>>({
  params,
  handler,
}: {
  params: T;
  handler: HandlerFunction<z.infer<T>>;
}): RequestHandler {
  return async (req, res, next) => {
    try {
      const parsedParams = params.parse(req.body); // Validate request body
      await handler({ req, res, params: parsedParams });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors }); // Return validation errors
      }
      next(error); // Pass other errors to Express error handler
    }
  };
}
