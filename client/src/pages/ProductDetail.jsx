import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useGetProductDetail from "../hooks/useGetProductDetail";
import useGetRelatedProducts from "../hooks/useGetRelatedProducts";
import useFavorite from "../hooks/useFavorite";
import useReview from "../hooks/useReview";
import { toast } from "react-toastify";
import { addProductToCart } from "../redux/slices/cartSlice";
import { Typography, Button, Rating, Chip } from "@material-tailwind/react";
import { displayRating, formatCurrencyVND, formatDate } from "../utils/helper";
import { FaCartShopping, FaHeart, FaRegHeart } from "react-icons/fa6";
import parse from "html-react-parser";
import TitleSection from "../components/TitleSection";
import "react-multi-carousel/lib/styles.css";
import CustomSwiper from "../components/CustomSwiper";

const ProductDetail = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { product } = useGetProductDetail(productId);
  const { relatedProducts, isLoading } = useGetRelatedProducts(product?.brand);
  const { handleToggleFavorite, userWishlist } = useFavorite();

  const {
    handleDeleteReview,
    handleWriteReview,
    handleLoadMoreReview,
    setVal,
    val,
    setRating,
    rating,
    reviews,
    isLoading: isLoadingReviews,
    isAdding,
  } = useReview();

  const handleAddProductToCart = () => {
    if (product?.stock === 0) {
      toast.error("This product is out of stock");
      return;
    }

    const productData = {
      id: product?._id,
      name: product?.name,
      image: product?.thumbnail,
      price: product?.discountPrice,
      quantity,
    };
    dispatch(addProductToCart(productData));
    toast.success("Đã thêm sản phẩm vào giỏ hàng");
  };

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const isInWishlist = userWishlist.find((item) => item?._id === product?._id);

  return (
    <div className="mt-10">
      {/* Product basic infomation */}
      <section className="grid grid-cols-2 gap-10">
        {/* LEFT */}
        <div className="flex items-center gap-5 h-[500px]">
          <div className="flex flex-col">
            {product?.images?.map((item, index) => (
              <div
                onClick={() => setSelectedImage(item)}
                key={index}
                className={`${
                  selectedImage === item
                    ? "border-red-600"
                    : "border-transparent "
                } aspect-square border-2 w-[100px] h-[100px]`}
              >
                <img
                  src={item}
                  alt=""
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center  mx-auto">
            <img
              src={selectedImage || product?.thumbnail}
              alt=""
              className="img-cover"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Chip
              size="lg"
              color="red"
              variant="ghost"
              value={product?.category?.name || ""}
              className="w-fit"
            />
            <Chip
              size="lg"
              color="blue"
              variant="ghost"
              value={product?.brand?.name || ""}
              className="w-fit rounded-full"
            />
          </div>

          <Typography className="font-medium text-2xl ">
            {product?.name || ""}
          </Typography>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-lg text-red-600">
              {displayRating(product?.rating)}
            </div>
            <span className="capitalize text-gray text-opacity-60">
              {`${product?.reviews?.length || 0} Đánh giá`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-lg opacity-50 font-bold line-through">
              {formatCurrencyVND(product?.originalPrice)}
            </h2>
            <h2 className="text-3xl text-red-600 font-bold">
              {formatCurrencyVND(product?.discountPrice)}
            </h2>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-5">
              <h1>Số lượng: </h1>
              <div className="border border-gray-500 w-fit rounded-full h-[50px] flex items-center">
                <button
                  className="text-3xl w-[50px] h-[50px]"
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </button>
                <span className="mx-4">{quantity}</span>
                <button
                  className="text-3xl w-[50px] h-[50px]"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <h1>Màu sắc: </h1>
              <p className={`capitalize font-semibold text-lg`}>
                {product?.color}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 ">
            {product?.stock === 0 ? (
              <Button
                disabled
                variant="filled"
                color="red"
                size="lg"
                className="w-full opacity-50 cursor-not-allowed"
              >
                Sản phẩm hết hàng
              </Button>
            ) : (
              <Button
                onClick={handleAddProductToCart}
                variant="filled"
                color="red"
                className="flex rounded-sm items-center gap-3  w-full justify-center"
              >
                <FaCartShopping size={20} />
                Thêm vào giỏ hàng
              </Button>
            )}

            {isInWishlist ? (
              <Button
                onClick={() => handleToggleFavorite(productId)}
                variant="text"
                color="red"
                className="flex rounded-sm items-center gap-3  w-full justify-center"
              >
                <FaHeart size={20} />
                Đã yêu thích sản phẩm
              </Button>
            ) : (
              <Button
                onClick={() => handleToggleFavorite(productId)}
                variant="outlined"
                color="red"
                className="flex rounded-sm items-center gap-3   w-full justify-center"
              >
                <FaRegHeart size={20} />
                Yêu thích sản phẩm
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Product detail */}
      <div className="mt-10">
        <div>
          <h1 className="text-3xl mb-2 text-gray-800 font-bold">
            Mô tả sản phẩm
          </h1>
          <p>{product?.description}</p>
        </div>

        <div className="mt-5">
          <h1 className="text-3xl mb-2 text-gray-800 font-bold">
            Chi tiết sản phẩm
          </h1>
          <div className="grid place-items-center">
            {parse(product?.detail || "")}
          </div>
        </div>
      </div>

      {/* Write review & rating */}
      <div className="mt-10">
        <div className="space-y-3">
          <Typography variant="h3">Viết đánh giá của bạn</Typography>
          <div className="flex items-center gap-2">
            <p className="text-lg">Đánh giá sản phẩm này: </p>
            <Rating onChange={(val) => setRating(val)} value={rating} />
          </div>

          <textarea
            value={val}
            required
            onChange={(e) => setVal(e.target.value)}
            className="min-h-[200px] focus:border-red-600 border-gray-300 resize-none outline-none w-full border-2 p-4 rounded-lg text-lg"
            placeholder="Viết đánh giá của bạn"
          ></textarea>

          <Button
            disabled={isAdding}
            onClick={() => handleWriteReview(productId)}
            color="red"
            className="ml-auto flex px-14"
            size="lg"
            type="submit"
          >
            {isAdding ? "Đang chờ..." : "Xác nhận"}
          </Button>
        </div>
      </div>

      {/* Render reviews */}
      <div className="mt-5">
        <h1 className="text-3xl mb-6 text-gray-800 font-bold">
          Tổng đánh giá ({reviews?.totalDocs || 0})
        </h1>

        {isLoadingReviews && (
          <p className="text-lg font-medium opacity-60 text-center">
            Đang tải đánh giá...
          </p>
        )}

        {!isLoadingReviews && reviews?.length === 0 && (
          <p className="text-lg font-medium opacity-60 text-center">
            Chưa có đánh giá nào cho sản phẩm này
          </p>
        )}

        <ul className="flex flex-col gap-5">
          {!isLoadingReviews &&
            reviews?.docs?.length > 0 &&
            reviews?.docs?.map((item) => (
              <UserComment
                key={item?._id}
                item={item}
                onDelete={handleDeleteReview}
              />
            ))}
        </ul>

        {reviews?.totalDocs > 5 && (
          <Button
            disabled={isLoadingReviews}
            onClick={handleLoadMoreReview}
            color="red"
            className="mx-auto flex justify-center items-center"
            size="lg"
            type="submit"
          >
            {isLoadingReviews ? "Đang chờ..." : "Tải thêm"}
          </Button>
        )}
      </div>

      {/* Related products */}
      <div className="mt-10">
        <TitleSection>Có thể bạn sẽ thích</TitleSection>

        <div className="mt-5">
          <CustomSwiper loading={isLoading} products={relatedProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

function UserComment({ item, onDelete }) {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <li className="flex items-start gap-3">
      <div className="flex-shrink-0 w-[50px] h-[50px]">
        <img
          src={item?.user?.avatar}
          alt={item?.user?.name}
          className="img-cover rounded-full"
        />
      </div>

      <div className="space-y-1">
        <div className="space-y-1">
          <Typography variant="h6">{item?.user?.name}</Typography>
          <Rating value={Number(item?.rate)} />
          <Typography variant="small">
            Ngày: {formatDate(item?.createdAt)}
          </Typography>
        </div>

        <Typography variant="lead">{item?.comment}</Typography>

        {item?.user?._id === currentUser?._id && (
          <button
            onClick={() => onDelete(item?._id)}
            className=" cursor-pointer text-red-600 hover:underline font-medium"
          >
            {"Xóa"}
          </button>
        )}
      </div>
    </li>
  );
}
