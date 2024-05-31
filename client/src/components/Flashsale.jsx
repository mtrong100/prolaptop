import React from "react";
import TitleSection from "./TitleSection";
import useGetProductFlashsale from "../hooks/useGetProductFlashsale";
import CustomSwiper from "./CustomSwiper";

const Flashsale = () => {
  const { loading, products } = useGetProductFlashsale();

  return (
    <div className="mt-10">
      <TitleSection>Flashsale ⚡</TitleSection>
      <div className="mt-5">
        <CustomSwiper loading={loading} products={products} />
      </div>
    </div>
  );
};

export default Flashsale;
