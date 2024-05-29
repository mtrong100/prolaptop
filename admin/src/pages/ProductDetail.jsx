import React from "react";
import { useParams } from "react-router-dom";
import useGetProductDetail from "../hooks/useGetProductDetail";
import TitleSection from "../components/TitleSection";
import { displayRating, formatCurrencyVND } from "../utils/helper";
import { Carousel, Chip, IconButton } from "@material-tailwind/react";
import parse from "html-react-parser";

const ProductDetail = () => {
  const { id: productId } = useParams();
  const { product } = useGetProductDetail(productId);

  return (
    <div>
      <TitleSection>Chi tiết sản phẩm</TitleSection>

      <div className="w-full max-w-6xl mt-5 mx-auto p-5 bg-gray-50 border border-blue-gray-200 rounded-sm">
        <section className="grid grid-cols-2 gap-10 text-lg">
          {/* Product infomation */}
          <div>
            <h1 className="font-bold mb-3 text-2xl text-blue-600">
              Thông tin cơ bản
            </h1>
            <div className="space-y-2">
              <div className="space-x-2">
                <span className="font-semibold">ID:</span>
                <span>{product?._id}</span>
              </div>
              <div className="space-x-2">
                <span className="font-semibold">Tên:</span>
                <span>{product?.name}</span>
              </div>
              <div className="space-x-2">
                <span className="font-semibold">Thương hiệu:</span>
                <span>
                  <Chip value={product?.brand} className="w-fit inline-block" />
                </span>
              </div>
              <div className="space-x-2">
                <span className="font-semibold">Danh mục:</span>
                <span>{product?.category}</span>
              </div>
              <div className="space-x-2">
                <span className="font-semibold">Màu sắc:</span>
                <span>{product?.color}</span>
              </div>
              <div className="space-x-2">
                <span className="font-semibold">Đánh giá:</span>
                <span>{displayRating(product?.rating)}</span>
              </div>
              <div className="space-x-2">
                <span className="font-semibold">Giá gốc:</span>
                <span className="font-bold opacity-60 line-through text-xl">
                  {formatCurrencyVND(product?.originalPrice)}
                </span>
              </div>
              <div className="space-x-2">
                <span className="font-semibold">Giá sau giảm:</span>
                <span className="font-bold text-red-500 text-xl">
                  {formatCurrencyVND(product?.discountPrice)}
                </span>
              </div>
              <div className="space-x-2">
                <span className="font-semibold">FlashSale:</span>
                <span>{product?.flashSale ? "✅" : "❌"}</span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-300 my-5"></div>

            <h1 className="font-bold mb-3 text-2xl text-blue-600">
              Thông số kỹ thuật
            </h1>
            <div className="space-y-2">
              <div className="space-x-2">
                <span className="font-semibold">Hệ điều hành:</span>
                <span>{product?.operatingSystem}</span>
              </div>
              <div className="space-x-2">
                <span className="font-semibold">RAM:</span>
                <span>{product?.ram}</span>
              </div>
              <div className="space-x-2">
                <span className="font-semibold">CPU:</span>
                <span>{product?.cpu}</span>
              </div>
              <div className="space-x-2">
                <span className="font-semibold">Ổ cứng:</span>
                <span>{product?.hardDrive}</span>
              </div>
              <div className="space-x-2">
                <span className="font-semibold">Màn hình:</span>
                <span>{product?.screen}</span>
              </div>
            </div>
          </div>

          {/* Product images */}
          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="font-bold mb-3 text-2xl text-blue-600">
                Ảnh thumbnail
              </h1>
              <img
                src={product?.thumbnail}
                alt={product?.name}
                className="w-full rounded-sm h-full object-contain"
              />
            </div>

            <div>
              <h1 className="font-bold mb-3 text-2xl text-blue-600">
                Ảnh chi tiết
              </h1>
              <Carousel
                className="rounded-sm"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                  <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                      <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                          activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                        }`}
                        onClick={() => setActiveIndex(i)}
                      />
                    ))}
                  </div>
                )}
                prevArrow={({ handlePrev }) => (
                  <IconButton
                    type="button"
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handlePrev}
                    className="!absolute top-2/4 left-4 -translate-y-2/4 bg-blue-50 hover:bg-blue-100 text-blue-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                  </IconButton>
                )}
                nextArrow={({ handleNext }) => (
                  <IconButton
                    type="button"
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handleNext}
                    className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-blue-50 hover:bg-blue-100 text-blue-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </IconButton>
                )}
              >
                {product?.images?.map((item, index) => (
                  <div key={index} className="w-full mx-auto ">
                    <img
                      src={item}
                      alt={index}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </section>

        {/* About */}
        <div className="mt-5 space-y-5">
          <div>
            <h1 className="font-bold mb-2 text-2xl text-blue-600">
              Mô tả sản phẩm
            </h1>
            <p>{product?.description}</p>
          </div>

          <div>
            <h1 className="font-bold mb-2 text-2xl text-blue-600">
              Thông tin chi tiết
            </h1>
            <div className="flex items-center justify-center flex-col">
              {parse(product?.detail || "")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
