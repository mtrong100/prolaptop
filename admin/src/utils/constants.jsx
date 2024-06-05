import { FaCartPlus, FaProductHunt, FaUsers } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import {
  MdManageSearch,
  MdOutlineCategory,
  MdOutlineRateReview,
} from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";

export const ADMIN_ID = "6646b7a84820f311fdc99db8";

export const LAPTOP_BRANDS = [
  "Dell",
  "HP",
  "Asus",
  "Acer",
  "Apple",
  "MSI",
  "Lenovo",
];

export const LAPTOP_COLORS = [
  "Đen",
  "Trắng",
  "Bạc",
  "Xám",
  "Hồng",
  "Xanh dương",
];

export const LAPTOP_RAMS = ["4GB", "8GB", "16GB", "32GB"];

export const LAPTOP_GRAPHIC_CARDS = [
  "NVIDIA GeForce Series",
  "AMD Radeon Series",
  "Card Onboard",
];

export const LAPTOP_SCREENS = ["13 inch", "14 inch", "15 inch", "16 inch"];

export const LAPTOP_CPUS = [
  "Intel Pentium",
  "Intel Celeron",
  "Intel Core i3",
  "Intel Core i4",
  "Intel Core i5",
  "Intel Core i9",
  "Intel Core Ultra",
  "AMD Ryzen 3",
  "AMD Ryzen 5",
  "AMD Ryzen 7",
  "M2 8 Core",
];

export const LAPTOP_HARD_DRIVES = [
  "SSD 1TB",
  "SSD 512GB",
  "SSD 256GB",
  "SSD 128GB",
];

export const PRODUCT_RATING = [1, 2, 3, 4, 5];

export const SIDEBAR_LINKS = [
  {
    title: "Sản phẩm",
    icon: <FaProductHunt size={20} />,
    items: [
      {
        text: "Thêm mới",
        navigateTo: "/admin/add-product",
        prefixIcon: <GoPlus size={25} />,
      },
      {
        text: "Quản lí",
        navigateTo: "/admin/manage-product",
        prefixIcon: <MdManageSearch size={25} />,
      },
    ],
  },
  {
    title: "Danh mục",
    icon: <MdOutlineCategory size={20} />,
    items: [
      {
        text: "Quản lí",
        navigateTo: "/admin/manage-category",
        prefixIcon: <MdManageSearch size={25} />,
      },
    ],
  },
  {
    title: "Mã giảm giá",
    icon: <RiCoupon3Line size={20} />,
    items: [
      {
        text: "Quản lí",
        navigateTo: "/admin/manage-couponcode",
        prefixIcon: <MdManageSearch size={25} />,
      },
    ],
  },
  {
    title: "Đơn hàng",
    icon: <FaCartPlus size={20} />,
    items: [
      {
        text: "Quản lí",
        navigateTo: "/admin/manage-order",
        prefixIcon: <MdManageSearch size={25} />,
      },
    ],
  },
  {
    title: "Phản hồi",
    icon: <MdOutlineRateReview size={20} />,
    items: [
      {
        text: "Quản lí",
        navigateTo: "/admin/manage-review",
        prefixIcon: <MdManageSearch size={25} />,
      },
    ],
  },
  {
    title: "Người dùng",
    icon: <FaUsers size={20} />,
    items: [
      {
        text: "Quản lí",
        navigateTo: "/admin/manage-user",
        prefixIcon: <MdManageSearch size={25} />,
      },
    ],
  },
];

export const ORDER_STATUS = [
  "Chờ xác nhận",
  "Đang lấy hàng",
  "Đang vận chuyển",
  "Đã giao hàng",
  "Đã hủy",
];

export const LAPTOP_CATEGORIES = [
  "Laptop chơi game",
  "Laptop văn phòng",
  "laptop đồ họa",
  "Laptop học tập",
  "Laptop doanh nhân",
  "Laptop mỏng nhẹ",
];
