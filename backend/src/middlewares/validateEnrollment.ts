import { NextFunction } from "connect";

export const validateEnrollmentData = (
  req: Request | any,
  res: Response | any,
  next: NextFunction
) => {
  const { courseId, token, amount, description } = req.body;
  if (!courseId || !token || !amount || !description) {
    return res.status(400).json({ message: "Missing required data" });
  }
  next();
};
