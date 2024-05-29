import React, { useEffect, useState } from "react";
import { SORT_BRANDS } from "../utils/constants";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";
import { getAllProductsApi } from "../api/productApi";
import TitleSection from "./TitleSection";

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
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass="carousel-item"
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 4,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {loading &&
            Array(12)
              .fill(0)
              .map((item, index) => <ProductCardSkeleton key={index} />)}

          {!loading &&
            products.length > 0 &&
            products.map((item) => <ProductCard key={item?._id} p={item} />)}
        </Carousel>
      </div>
    </div>
  );
};

export default TopSellingProduct;
