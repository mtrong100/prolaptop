import { Button, Chip } from "@material-tailwind/react";
import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { BiSolidBinoculars } from "react-icons/bi";
import { Typography } from "@material-tailwind/react";
import { displayRating } from "./displayRating";
import { useNavigate } from "react-router-dom";
import { viewProductApi } from "../api/productApi";
import { useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { addProductToCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
import useFavorite from "../hooks/useFavorite";

const ProductCardHorizontal = ({ p }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);
  const { handleToggleFavorite, userWishlist } = useFavorite();

  const handleAddProductToCart = () => {
    if (p?.stock === 0) {
      toast.error("This product is out of stock");
      return;
    }

    const productData = {
      id: p?._id,
      name: p?.name,
      image: p?.thumbnails[0],
      price: p?.price,
      quantity: 1,
    };

    dispatch(addProductToCart(productData));
    toast.success("Product added to your cart");
  };

  const handleViewProduct = async () => {
    try {
      await viewProductApi(p?._id);
      navigate(`/product/${p?._id}`);
    } catch (error) {
      console.log("Failed to update view count ->", error);
    }
  };

  const isInWishlist = userWishlist.find((item) => item?._id === p?._id);

  return (
    <div className="grid grid-cols-[minmax(0,_1fr)_220px] gap-5 items-center">
      <div className="flex items-center gap-5">
        <div
          onClick={handleViewProduct}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-[200px] h-[200px] flex-shrink-0  overflow-hidden"
        >
          <img
            src={hovered ? p?.thumbnails[1] : p?.thumbnails[0]}
            alt={p?.name}
            className="w-full h-full object-contain rounded-sm "
          />
        </div>

        <div>
          <Chip
            size="md"
            color="amber"
            variant="ghost"
            value={p?.category}
            className="w-fit"
          />
          <h1
            onClick={handleViewProduct}
            className="text-xl hover:text-amber-600  mt-2 transition-all cursor-pointer line-clamp-2 capitalize"
          >
            {p?.name}
          </h1>
          <p className="mt-2 opacity-60 font-normal line-clamp-3">{p?.desc}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-3xl text-amber-600 font-bold">${p?.price}</h2>

        <div className="flex items-center gap-5 opacity-50">
          <div className="flex items-center gap-1">
            {displayRating(p?.rating)}
          </div>
          <span className="capitalize text-gray text-opacity-60">
            {`${p?.reviews?.length || 0} Reviews`}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-5 text-xs opacity-60 items-center">
          <div
            onClick={handleViewProduct}
            className="flex items-center gap-2 hover:text-amber-600 cursor-pointer"
          >
            <BiSolidBinoculars size={18} className="hover:text-yellow" />
            Quick View
          </div>

          {isInWishlist ? (
            <div
              onClick={() => handleToggleFavorite(p?._id)}
              className="flex items-center gap-2 hover:opacity-90 text-amber-600 cursor-pointer"
            >
              <FaHeart size={18} />
              Wishlist
            </div>
          ) : (
            <div
              onClick={() => handleToggleFavorite(p?._id)}
              className="flex items-center gap-2 hover:text-amber-600 cursor-pointer"
            >
              <FaRegHeart size={18} />
              Wishlist
            </div>
          )}
        </div>

        {p?.stock === 0 ? (
          <Button
            disabled
            variant="outlined"
            color="red"
            className="w-full opacity-50 cursor-not-allowed"
          >
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={handleAddProductToCart}
            variant="outlined"
            color="amber"
            className="flex rounded-none items-center gap-3 hover:bg-amber-600 hover:text-white w-full justify-center"
          >
            <BsCart3 size={20} />
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCardHorizontal;

export const ProductCardHorizontalSkeleton = () => {
  return (
    <div className="grid grid-cols-[minmax(0,_1fr)_220px] gap-5 items-center animate-pulse">
      <div className="flex items-center gap-5">
        <div className="w-[200px] h-[200px] flex-shrink-0 flex justify-center items-center bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-20 w-20 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Typography
            as="div"
            variant="paragraph"
            className=" h-5 w-32 rounded-sm bg-gray-300"
          >
            &nbsp;
          </Typography>
          <div className="space-y-2 mt-2">
            <Typography
              as="div"
              variant="h1"
              className="h-6 w-full rounded-sm bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="h1"
              className="h-6 w-full rounded-sm bg-gray-300"
            >
              &nbsp;
            </Typography>
          </div>
          <div className="space-y-2 mt-2">
            <Typography
              as="div"
              variant="paragraph"
              className="h-4  w-full rounded-sm bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="h-4  w-full rounded-sm bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="h-4  w-72 rounded-sm bg-gray-300"
            >
              &nbsp;
            </Typography>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Typography
          as="div"
          variant="paragraph"
          className="h-8  w-32 rounded-sm bg-gray-300"
        >
          &nbsp;
        </Typography>

        <Typography
          as="div"
          variant="paragraph"
          className="h-4  w-full rounded-sm bg-gray-300"
        >
          &nbsp;
        </Typography>

        <Typography
          as="div"
          variant="paragraph"
          className="h-4  w-full rounded-sm bg-gray-300"
        >
          &nbsp;
        </Typography>

        <Typography
          as="div"
          variant="paragraph"
          className="h-10  w-full rounded-sm bg-gray-300"
        >
          &nbsp;
        </Typography>
      </div>
    </div>
  );
};
