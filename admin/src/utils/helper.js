export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const truncateText = (str, maxLength) => {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
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

export const formatCurrencyVND = (amount) => {
  if (typeof amount !== "number") {
    return "Input must be a number";
  }
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
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
