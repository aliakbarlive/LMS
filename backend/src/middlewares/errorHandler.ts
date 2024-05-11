import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.status || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'ValidationError') {
    const errors: { [key: string]: string } = {};

    // Handle Yup validation errors
    if (err.inner) {
      err.inner.forEach((validationError: any) => {
        const { path, message } = validationError;
        errors[path] = message;
      });
    }

    // Handle Mongoose validation errors
    if (err.errors) {
      for (let field in err.errors) {
        const error = err.errors[field];
        if (error instanceof mongoose.Error.CastError) {
          const path = error.path;
          const kind = error.kind;
          errors[field] = `${path} must be ${kind}`;
        } else {
          errors[field] = error.message;
        }
      }
    }
    // Getting the first key-value pair
    const message = Object.values(err.errors)[0]
    console.log(message, '....')
    return res.status(422).json({ status:false,msg:message
      ,errors });
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    // Handle MongoDB duplicate key error
    statusCode = 400;
    message = 'Duplicate key violation. This resource already exists.';
  }
    // Handle specific CastError for ObjectId
    if (err.name === 'CastError' && err instanceof mongoose.Error.CastError) {
      if (err.kind === 'ObjectId') {
        statusCode = 400;
        message = 'Invalid resource id';
      }
    }

  if (err.name === 'JsonWebTokenError') {
    // Handle JWT validation errors
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    // Handle expired JWT tokens
    statusCode = 401;
    message = 'Token has expired';
  }

  if (err.name === 'SyntaxError' && err instanceof SyntaxError) {
    // Handle JSON parsing errors
    statusCode = 400;
    message = 'Invalid JSON format';
  }

  if (err.name === 'TypeError' && err instanceof TypeError) {
    // Handle TypeErrors
    statusCode = 400;
    message = 'Type error occurred';
  }

  // Add more custom error handling based on your application's needs

  // Log the error for debugging purposes
  console.error(err);

  // Send the error response
  res.status(statusCode).json({ status: false, msg:message });
};

export default errorHandler;
