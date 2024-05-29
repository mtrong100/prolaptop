import React from "react";
import TitleSection from "../components/TitleSection";
import CategoryStatistic from "../components/charts/CategogryStastistic";
import useGetCollectionApi from "../hooks/useGetCollectionApi";

const Statistic = () => {
  const { results: products } = useGetCollectionApi("product");

  return (
    <div>
      <TitleSection>Thống kê</TitleSection>

      <div className="mt-10 space-y-12">
        <div className="space-y-8">
          <h1>Thống kê số lượng hàng trong mỗi danh mục</h1>
          <CategoryStatistic results={products} />
        </div>
      </div>
    </div>
  );
};

export default Statistic;
