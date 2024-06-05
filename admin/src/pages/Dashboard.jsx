import React from "react";
import { useSelector } from "react-redux";
import TitleSection from "../components/TitleSection";
import { FaCartPlus, FaProductHunt, FaUsers } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { formatCurrencyVND } from "../utils/helper";
import useCaculateTotalRevenue from "../hooks/useCaculateTotalRevenue";
import useGetCollectionApi from "../hooks/useGetCollectionApi";
import MonthlyRevenueChart from "../components/charts/MonthlyRevenueChart";
import CategoryStatistic from "../components/charts/CategogryStastistic";
import CategoryPieChart from "../components/charts/CategoryPieChart";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { totalRevenue } = useCaculateTotalRevenue();
  const { results: products } = useGetCollectionApi("product");
  const { results: orders } = useGetCollectionApi("order");
  const { results: users } = useGetCollectionApi("user");

  return (
    <div>
      <TitleSection>Quản lí chung</TitleSection>

      <div className="mt-5 grid grid-cols-4 gap-3">
        <Box
          color="red"
          heading="Đơn hàng"
          number={orders.length || 0}
          icon={<FaCartPlus size={30} color="white" />}
        />
        <Box
          color="blue"
          heading="Doanh thu"
          number={formatCurrencyVND(totalRevenue)}
          icon={<MdOutlineAttachMoney size={30} color="white" />}
        />
        <Box
          color="green"
          heading="Sản phẩm"
          number={products?.length || 0}
          icon={<FaProductHunt size={30} color="white" />}
        />
        <Box
          color="amber"
          heading="Người dùng"
          number={users.length || 0}
          icon={<FaUsers size={30} color="white" />}
        />
      </div>

      <div className="mt-10 space-y-5">
        <div className="space-y-5">
          <h1 className="text-2xl font-bold text-blue-gray-700">
            Thống kê doanh thu theo tháng
          </h1>
          <MonthlyRevenueChart />
        </div>
        <div className="space-y-5">
          <h1 className="text-2xl font-bold text-blue-gray-700">
            Thống kê danh mục hàng hóa
          </h1>
          <CategoryPieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

function Box({ icon, heading, number, color }) {
  function displayBoxColor(val) {
    if (!val) return;

    switch (val) {
      case "red":
        return "bg-red-500";
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "amber":
        return "bg-amber-500";

      default:
        return "bg-white";
    }
  }

  return (
    <div className="border bg-gray-100  border-gray-300 rounded-sm flex items-center gap-5">
      <div
        className={`${displayBoxColor(
          color
        )} aspect-video w-[100px] hover:opacity-80 transition-all h-[100px] flex-shrink-0 flex items-center justify-center`}
      >
        {icon}
      </div>
      <div className="space-y-2">
        <h1 className="font-semibold text-xl">{heading}</h1>
        <p className="font-bold text-xl">{number}</p>
      </div>
    </div>
  );
}
