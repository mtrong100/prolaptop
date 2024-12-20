import React, { useEffect, useState } from "react";
import TitleSection from "../components/TitleSection";
import useWishlist from "../hooks/useWishlist";
import { Button, Chip, Typography } from "@material-tailwind/react";
import { formatCurrencyVND } from "../utils/helper";
import { getAllProductsApi } from "../api/productApi";
import "react-multi-carousel/lib/styles.css";
import useFavorite from "../hooks/useFavorite";
import Empty from "../components/Empty";
import CustomSwiper from "../components/CustomSwiper";

const TABLE_HEAD = [
  "Sản phẩm",
  "Giá tiền",
  "Hãng sản xuất",
  "Danh mục",
  "Thao tác",
];

const Wishlist = () => {
  const { userWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { handleToggleFavorite } = useFavorite();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await getAllProductsApi({ category: "Laptop văn phòng" });
        setProducts(res?.docs);
      } catch (error) {
        console.log("Lỗi: ", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="mt-10">
      <TitleSection>Sản phẩm yêu thích</TitleSection>

      <div className="mt-5">
        {userWishlist.length === 0 ? (
          <Empty
            link="/"
            buttonText="Quay về trang chủ"
            firstCaption="Sản phẩm yêu thích của bạn hiện đang trống."
            secondCaption="Hãy tym 1 sản phẩm
          bất kì trong cửa hàng của chúng tôi"
          />
        ) : (
          <TableWithStripedRows
            data={userWishlist}
            onRemoveFavorite={handleToggleFavorite}
          />
        )}
      </div>

      <div className="mt-20">
        <TitleSection>Đề xuất cho bạn</TitleSection>
        <div className="mt-5">
          <CustomSwiper loading={loading} products={products} />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

export function TableWithStripedRows({ data = [], onRemoveFavorite }) {
  return (
    <div className="h-full w-full ">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className={`${
                  head === "Sản phẩm" ? "w-[500px]" : ""
                } border-b border-blue-gray-100 bg-blue-gray-50 p-4`}
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item?._id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item?.thumbnail}
                    alt={item?.name}
                    className="object-cover w-[70px] h-[60px] flex-shrink-0"
                  />
                  <h1 className="line-clamp-3 flex-1">{item?.name}</h1>
                </div>
              </td>
              <td className="p-4">
                <Typography variant="h5" color="red" className="font-bold">
                  {formatCurrencyVND(item?.discountPrice)}
                </Typography>
              </td>
              <td className="p-4">
                <Chip
                  variant="ghost"
                  color="blue"
                  value={item?.brand?.name}
                  className="w-fit"
                  size="md"
                />
              </td>
              <td className="p-4">
                <Chip
                  variant="ghost"
                  value={item?.category?.name}
                  className="w-fit"
                  size="md"
                />
              </td>
              <td className="p-4">
                <Button
                  color="red"
                  variant="gradient"
                  onClick={() => onRemoveFavorite(item?._id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
