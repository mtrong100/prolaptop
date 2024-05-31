import React, { useEffect, useState } from "react";
import { SORT_BRANDS } from "../utils/constants";
import "react-multi-carousel/lib/styles.css";
import { getAllProductsApi } from "../api/productApi";
import TitleSection from "./TitleSection";
import CustomSwiper from "./CustomSwiper";

const TopSellingProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(SORT_BRANDS[0]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      try {
        let res;

        if (filter === SORT_BRANDS[0]) {
          res = await getAllProductsApi();
        } else {
          res = await getAllProductsApi({ brand: filter, limit: 8 });
        }

        setProducts(res?.docs);
      } catch (error) {
        console.log("Lỗi: ", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filter]);

  return (
    <div className="mt-20">
      <div className="flex items-center justify-between">
        <TitleSection>Sản phẩm bán chạy</TitleSection>

        <ul className="flex items-center gap-5">
          {SORT_BRANDS.map((item) => (
            <li
              onClick={() => setFilter(item)}
              className={`${
                item === filter
                  ? "text-red-600 opacity-100"
                  : "hover:text-red-600 opacity-70"
              }  text-sm uppercase font-semibold cursor-pointer transition-all`}
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <CustomSwiper loading={loading} products={products} />
      </div>
    </div>
  );
};

export default TopSellingProduct;
