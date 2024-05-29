import * as yup from "yup";

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required("Tên sản phẩm là bắt buộc")
    .min(2, "Tên sản phẩm phải có ít nhất 2 ký tự")
    .max(255, "Tên sản phẩm phải có tối đa 255 ký tự"),
  description: yup
    .string()
    .required("Mô tả sản phẩm là bắt buộc")
    .min(10, "Mô tả sản phẩm phải có ít nhất 10 ký tự")
    .max(2000, "Mô tả sản phẩm phải có tối đa 2000 ký tự"),
  originalPrice: yup
    .number("Giá gốc phải là một số")
    .required("Giá gốc là bắt buộc")
    .positive("Giá gốc phải là một số dương"),
  discountPrice: yup
    .number("Giá sau giảm phải là một số")
    .required("Giá sau giảm là bắt buộc")
    .positive("Giá sau giảm phải là một số dương"),
  stock: yup
    .number("Tồn kho phải là một số")
    .required("Tồn kho là bắt buộc")
    .integer("Tồn kho phải là một số nguyên")
    .min(0, "Tồn kho phải là số không âm"),
});
