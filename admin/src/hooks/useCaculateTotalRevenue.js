import { useEffect, useState } from "react";
import { getOrderCollectionApi } from "../api/orderApi";

export default function useCaculateTotalRevenue() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const res = await getOrderCollectionApi({ status: "Đã giao hàng" });
        setOrders(res);
      } catch (error) {
        console.log("Lỗi fetch data đơn hàng: ", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    const revenue = orders.reduce(
      (sum, order) => sum + (order.totalCost || 0),
      0
    );
    setTotalRevenue(revenue);
  }, [orders]);

  return { loading, orders, totalRevenue };
}
