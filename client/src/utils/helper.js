export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatCurrencyVND = (amount) => {
  if (typeof amount !== "number") {
    return "Input must be a number";
  }
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
};

export const truncateText = (str, maxLength) => {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

export const dateStringToMilliseconds = (dateString) => {
  if (!dateString) return;
  return new Date(dateString).getTime();
};

export const capitalizeFirstLetter = (str) => {
  if (!str) return;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const displayRating = (num) => {
  switch (num) {
    case 1:
      return "⭐";
    case 2:
      return "⭐⭐";
    case 3:
      return "⭐⭐⭐";
    case 4:
      return "⭐⭐⭐⭐";
    case 5:
      return "⭐⭐⭐⭐⭐";
    default:
      return "Lỗi";
  }
};

export const displayTextColor = (color) => {
  if (!color) return;

  switch (color) {
    case "blue":
      return "text-blue-600";
    case "red":
      return "text-red-600";
    case "amber":
      return "text-amber-600";
    case "teal":
      return "text-teal-600";
    case "blue-gray":
      return "text-blue-gray-600";
    case "gray":
      return "text-gray-600";
    case "indigo":
      return "text-indigo-600";
    case "lime":
      return "text-lime-600";
    case "pink":
      return "text-pink-600";
    case "purple":
      return "text-purple-600";
    case "orange":
      return "text-orange-600";
    default:
      return "text-black";
  }
};

export const displayStatus = (val) => {
  switch (val) {
    case "Chờ xác nhận":
      return "amber";
    case "Đang lấy hàng":
      return "indigo";
    case "Đang vận chuyển":
      return "blue";
    case "Đã giao hàng":
      return "green";
    case "Đã hủy":
      return "red";

    default:
      return "";
  }
};
