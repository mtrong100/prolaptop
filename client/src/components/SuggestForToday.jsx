import React from "react";
import TitleSection from "./TitleSection";
import useGetRelatedProducts from "../hooks/useGetRelatedProducts";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";

const SuggestForToday = () => {
  const { relatedProducts: products, isLoading: loading } =
    useGetRelatedProducts("Asus");

  return (
    <div className="mt-20">
      <TitleSection>Gợi ý cho hôm nay</TitleSection>
      <div className="mt-5 grid grid-cols-3 gap-5">
        {loading &&
          Array(12)
            .fill(0)
            .map((item, index) => <ProductCardSkeleton key={index} />)}

        {!loading &&
          products.length > 0 &&
          products.map((item) => <ProductCard key={item?._id} p={item} />)}
      </div>
    </div>
  );
};

export default SuggestForToday;
