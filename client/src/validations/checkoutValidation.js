import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be at most 50 characters")
    .required("Full name is required"),
  address: yup
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be at most 100 characters")
    .required("Address is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});
