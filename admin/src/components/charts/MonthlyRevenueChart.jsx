import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { getOrderCollectionApi } from "../../api/orderApi";
import dayjs from "dayjs";

const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthlyRevenueChart = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

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
    // Calculate the total revenue for each month
    const revenueByMonth = orders.reduce((acc, order) => {
      const month = dayjs(order.date).month(); // Get month index (0-11)
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += order.totalCost || 0;
      return acc;
    }, Array(12).fill(0)); // Initialize array with 12 zeros

    const formattedRevenue = revenueByMonth.map((revenue, index) => ({
      month: monthsArray[index],
      revenue,
    }));

    setMonthlyRevenue(formattedRevenue);
  }, [orders]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={monthlyRevenue}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyRevenueChart;
