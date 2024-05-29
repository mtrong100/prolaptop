import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Tên người dùng phải có ít nhất 3 ký tự.")
    .max(20, "Tên người dùng phải có nhiều nhất 20 ký tự.")
    .required("Tên người dùng là bắt buộc."),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .max(20, "Mật khẩu phải có nhiều nhất 20 ký tự.")
    .required("Mật khẩu là bắt buộc."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu phải khớp")
    .required("Xác nhận mật khẩu là bắt buộc."),
  email: yup
    .string()
    .email("Định dạng email không hợp lệ.")
    .required("Email là bắt buộc.")
    .lowercase("Email phải ở dạng chữ thường."),
});
