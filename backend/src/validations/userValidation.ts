import * as yup from "yup";

const instructorValidationSchema = yup.object().shape({
  experience: yup.string().required(),
  skills: yup.array().of(yup.string()).required(),
});

const organizationValidationSchema = yup.object().shape({
  expertise: yup.array().of(yup.string()).required(),
  orgBackground: yup.string().required(),
});

export const phoneSchemaValidation = yup
  .string()
  .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, "Invalid phone number");
export const registerSchema = yup.object().shape({
  name: yup.string().required().min(3),
  user_type: yup
    .string()
    .oneOf(["Student", "Instructor", "Organization"])
    .required(),
  countryCode: yup
    .string()
    .matches(/^\+\d{1,3}$/, "Invalid country code")
    .required(),
  phone: yup
    .string()
    .matches(/^\d{7,15}$/, "Invalid phone number")
    .required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  userTypeData: yup.mixed().test({
    test: function (value) {
      const { user_type } = this.parent;
      if (user_type === "Instructor") {
        return instructorValidationSchema.isValid(value);
      } else if (user_type === "Organization") {
        return organizationValidationSchema.isValid(value);
      } else {
        return true;
      }
    },
  }),
});

export const profilePicApprovalSchema = yup.object().shape({
  profilePicStatus: yup.string().required("profile pic status is required"),
});
export const loginSchema = yup.object().shape({
  email: yup.string().required("Email or username is required"),
  password: yup.string().required(),
});

export const createUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  userName: yup.string().required().min(3),
  firstName: yup.string().required().min(2),
  lastName: yup.string().required().min(1),
  role: yup.string().required(),
  password: yup.string().required(),
  profilePic: yup.string().optional(),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().required().email(),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required().min(8),
  token: yup.string().required(),
});

export const googleRegisterSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  user_type: yup.string().oneOf(["Student", "Instructor", "Organization"]),
});

export const googleLoginSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
});

export const appleRegisterSchema = yup.object().shape({
  id_token: yup.string().required(),
  user_type: yup.string().oneOf(["Student", "Instructor", "Organization"]),
});

export const appleLoginSchema = yup.object().shape({
  id_token: yup.string().required(),
});
