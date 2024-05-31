import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";

const CustomSwiper = ({ loading, products = [] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="swiper-container">
      <Swiper
        slidesPerView={1}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.update();
        }}
      >
        {loading &&
          Array(12)
            .fill(0)
            .map((_, index) => (
              <SwiperSlide key={index}>
                <ProductCardSkeleton />
              </SwiperSlide>
            ))}

        {!loading &&
          products.length > 0 &&
          products.map((item) => (
            <SwiperSlide key={item?._id}>
              <ProductCard p={item} />
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev" ref={prevRef}>
        <FaChevronLeft size={10} />
      </div>
      <div className="swiper-button-next" ref={nextRef}>
        <FaChevronRight size={10} />
      </div>
    </div>
  );
};

export default CustomSwiper;
