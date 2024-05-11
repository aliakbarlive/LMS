import { Request, Response, NextFunction } from "express";
import { ValidationError } from "yup";
import multer from "multer";
export const handleValidationErrors = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((e:any) => {
          validationErrors[e.path] = e.message;
        });
        res.status(400).json({ status: false, errors: validationErrors });
      } else {
        console.error('Error:', error);
        res.status(500).json({ status: false, message: 'Internal server error' });
      }
    }
  };
};

// Create multer instance for file upload
const upload = multer({ dest: "uploads/" });

export const handleFormDataValidation = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Use multer to handle file uploads
    upload.any()(req, res, async (err: any) => {
      if (err) {
        return res
          .status(400)
          .json({ status: false, message: "File upload error" });
      }

      try {
        await schema.validate(req.body, { abortEarly: false });
        next();
      } catch (error) {
        if (error instanceof ValidationError) {
          const validationErrors: { [key: string]: string } = {};
          error.inner.forEach((e: any) => {
            validationErrors[e.path] = e.message;
          });
          res.status(400).json({ status: false, errors: validationErrors });
        } else {
          console.error("Error:", error);
          res
            .status(500)
            .json({ status: false, message: "Internal server error" });
        }
      }
    });
  };
};
