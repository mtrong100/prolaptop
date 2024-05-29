import React from "react";
import TitleSection from "./TitleSection";
import useGetProductFlashsale from "../hooks/useGetProductFlashsale";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";

const Flashsale = () => {
  const { loading, products } = useGetProductFlashsale();

  return (
    <div className="mt-10">
      <TitleSection>Flashsale ⚡</TitleSection>
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

export default Flashsale;
