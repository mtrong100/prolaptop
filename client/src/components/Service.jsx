import React from "react";
import { GoRocket } from "react-icons/go";
import { IoReload, IoAlertCircleOutline } from "react-icons/io5";
import { GrSupport } from "react-icons/gr";
import TitleSection from "./TitleSection";

const Service = () => {
  return (
    <div className="mt-20 space-y-5">
      <TitleSection>Dịch vụ của chúng tôi</TitleSection>
      <div className="mt-16 grid grid-cols-4 gap-5">
        <ServiceCard
          icon={<GoRocket size={40} />}
          title="Miễn phí vận chuyển"
          caption="đơn hàng từ $50 trở lên"
        />
        <ServiceCard
          icon={<IoReload size={40} />}
          title="Miễn phí trả hàng"
          caption="trong vòng 30 ngày"
        />
        <ServiceCard
          icon={<IoAlertCircleOutline size={40} />}
          title="Giảm 20% cho 1 sản phẩm"
          caption="Khi bạn đăng ký"
        />
        <ServiceCard
          icon={<GrSupport size={40} />}
          title="Chúng tôi hỗ trợ"
          caption="Dịch vụ tuyệt vời 24/7"
        />
      </div>
    </div>
  );
};

export default Service;

function ServiceCard({ icon, title, caption }) {
  return (
    <div className="flex items-center border border-gray-300 hover:bg-red-500 hover:text-white justify-center hover:-translate-y-3 transition-all duration-200 gap-5 bg-gray-100 px-5 py-10 rounded-lg">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 ">
        <h1 className="font-bold">{title}</h1>
        <p className="opacity-80">{caption}</p>
      </div>
    </div>
  );
}
