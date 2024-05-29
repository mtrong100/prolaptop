import * as yup from "yup";

export const accountSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Tên người dùng phải có ít nhất 3 ký tự.")
    .max(20, "Tên người dùng phải có nhiều nhất 20 ký tự.")
    .required("Tên người dùng là bắt buộc."),
  email: yup
    .string()
    .email("Định dạng email không hợp lệ.")
    .required("Email là bắt buộc.")
    .lowercase("Email phải ở dạng chữ thường."),
  address: yup.string().max(255, "Địa chỉ phải có nhiều nhất 255 ký tự."),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa các chữ số.")
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số.")
    .max(15, "Số điện thoại phải có nhiều nhất 15 chữ số.")
    .required("Số điện thoại là bắt buộc."),
});
