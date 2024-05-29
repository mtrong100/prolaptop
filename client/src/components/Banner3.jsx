import React from "react";
import TitleSection from "./TitleSection";
import Banner8 from "../assets/banners/banner8.webp";
import Banner9 from "../assets/banners/banner9.webp";

const Banner3 = () => {
  return (
    <div className="mt-20">
      <TitleSection>Chuyên trang thương hiệu</TitleSection>
      <div className="mt-5 grid grid-cols-2 gap-5">
        <div>
          <img src={Banner8} alt="banner" className="img-cover rounded-sm" />
        </div>
        <div>
          <img src={Banner9} alt="banner" className="img-cover rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default Banner3;
