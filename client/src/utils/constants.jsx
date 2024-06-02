import { FaRegCircleUser } from "react-icons/fa6";
import { IoCartOutline, IoWalletOutline } from "react-icons/io5";

export const ADMIN_ID = "6646b7a84820f311fdc99db8";

export const PRICES = [
  {
    label: "Dưới 10 triệu",
    minNum: 0,
    maxNum: 10000000,
  },
  {
    label: "Từ 10 triệu đến 15 triệu",
    minNum: 10000000,
    maxNum: 15000000,
  },
  {
    label: "Từ 15 triệu đến 20 triệu",
    minNum: 15000000,
    maxNum: 20000000,
  },
  {
    label: "Từ 20 triệu đến 25 triệu",
    minNum: 20000000,
    maxNum: 25000000,
  },
  {
    label: "Trên 25 triệu",
    minNum: 25000000,
    maxNum: 85000000,
  },
];

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

export const SORT_BRANDS = ["All", "Dell", "HP", "Asus", "Acer"];

export const SORT_STATUS = [
  {
    label: "Mới nhất",
    value: "desc",
  },
  {
    label: "Cũ nhất",
    value: "asc",
  },
];

export const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const PROFILE_SIDEBAR = [
  {
    name: "Tài khoản",
    icon: <FaRegCircleUser size={20} />,
    link: "/account",
  },
  {
    name: "Đơn hàng của tôi",
    icon: <IoWalletOutline size={20} />,
    link: "/order",
  },
  {
    name: "Giỏ hàng của tôi",
    icon: <IoCartOutline size={20} />,
    link: "/cart",
  },
];

export const NAV_LINKS = [
  {
    name: "Trang chủ",
    link: "/",
  },
  {
    name: "Sản phẩm",
    link: "/product",
  },
  {
    name: "Về chúng tôi",
    link: "/about",
  },
  {
    name: "Sản phẩm yêu thích",
    link: "/wishlist",
  },
  {
    name: "Tài khoản của tôi",
    link: "/account",
  },
];

export const SHIPPING_METHOD = [
  {
    name: "Giao hàng nhanh",
    price: 50000,
  },
  {
    name: "Giao hàng tiêu chuẩn",
    price: 25000,
  },
  {
    name: "Giao hàng tiết kiệm",
    price: 20000,
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
