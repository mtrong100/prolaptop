import React from "react";
import TitleSection from "../components/TitleSection";
import {
  Input,
  Typography,
  IconButton,
  Switch,
  Chip,
  Select,
  Option,
} from "@material-tailwind/react";
import { IoSearchOutline, IoEye } from "react-icons/io5";
import useManageProduct from "../hooks/useManageProduct";
import {
  MdChevronLeft,
  MdChevronRight,
  MdDelete,
  MdOutlineEdit,
} from "react-icons/md";
import { formatCurrencyVND, formatDate } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import useGetCategories from "../hooks/useGetCategories";
import useGetBrands from "../hooks/useGetBrands";

const TABLE_HEAD = [
  "Sản phẩm",
  "Hãng",
  "Danh mục",
  "Giá sau giảm",
  "Tồn kho",
  "FlashSale",
  "Ngày thêm",
  "Thao tác",
];

const ManageProduct = () => {
  const {
    products,
    handleSwitchFlashSale,
    handleQuery,
    handleDeleteProduct,
    handleNextPage,
    handlePrevPage,
    paginate,
    setFilter,
    filter,
  } = useManageProduct();

  const { categories } = useGetCategories();
  const { brands } = useGetBrands();

  return (
    <div>
      <TitleSection>Quản lí sản phẩm</TitleSection>

      <div className="mt-5  flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-72">
            <Select
              size="lg"
              label="Danh mục"
              color="red"
              onChange={(val) => setFilter({ ...filter, category: val })}
            >
              {categories?.map((item) => (
                <Option key={item?._id} value={item?.name}>
                  {item?.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className="w-72">
            <Select
              size="lg"
              label="Thương hiệu"
              color="red"
              onChange={(val) => setFilter({ ...filter, brand: val })}
            >
              {brands?.map((item) => (
                <Option key={item?._id} value={item?.name}>
                  {item?.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-1 w-full max-w-xs">
          <Input
            size="lg"
            color="blue"
            label="Tìm kiếm"
            value={filter.query || ""}
            onChange={handleQuery}
            className="w-full"
          />
          <IconButton size="md" className="flex-shrink-0 h-[44px]">
            <IoSearchOutline size={20} color="white" />
          </IconButton>
        </div>
      </div>

      <TableWithStripedRows
        products={products}
        onSwitch={handleSwitchFlashSale}
        onDelete={handleDeleteProduct}
      />

      <div className="mt-5 mb-10 flex items-center justify-end gap-4">
        <IconButton onClick={handlePrevPage} size="md">
          <MdChevronLeft size={25} color="white" />
        </IconButton>
        <div className="text-xl font-semibold opacity-60">
          {paginate.currentPage}/{paginate.totalPages}
        </div>
        <IconButton onClick={handleNextPage} size="md">
          <MdChevronRight size={25} color="white" />
        </IconButton>
      </div>
    </div>
  );
};

export default ManageProduct;

export function TableWithStripedRows({ products = [], onSwitch, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="mt-8 mb-5 h-full w-full">
      <table className="text-left text-sm w-full">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className={`whitespace-nowrap border-b border-blue-gray-100 bg-blue-gray-50 p-4 `}
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
          {products.map((item) => {
            return (
              <tr
                key={item?._id}
                className="even:bg-blue-gray-50/50 whitespace-nowrap"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3 w-full  whitespace-normal">
                    <img
                      src={item?.thumbnail}
                      alt={item?.name}
                      className="object-cover w-[60px] h-[60px] aspect-square flex-shrink-0"
                    />
                    <h1 className="line-clamp-3 flex-1">{item?.name}</h1>
                  </div>
                </td>
                <td className="p-4">
                  <Chip
                    value={item?.brand?.name || ""}
                    size="sm"
                    variant="ghost"
                    color="blue"
                    className="w-fit"
                  />
                </td>
                <td className="p-4">
                  <Chip
                    value={item?.category?.name || ""}
                    size="sm"
                    variant="ghost"
                    className="w-fit"
                  />
                </td>
                <td className="p-4">
                  <Typography variant="small" color="red" className="font-bold">
                    {formatCurrencyVND(item.discountPrice)}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item?.stock}
                  </Typography>
                </td>
                <td className="p-4">
                  <Switch
                    color="green"
                    checked={item?.flashSale}
                    onChange={() => onSwitch(item?._id)}
                  />
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {formatDate(item?.createdAt)}
                  </Typography>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <IconButton
                      onClick={() =>
                        navigate(`/admin/view-product/${item?._id}`)
                      }
                      color="blue"
                      size="md"
                    >
                      <IoEye size={20} color="white" />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        navigate(`/admin/update-product/${item?._id}`)
                      }
                      color="green"
                      size="md"
                    >
                      <MdOutlineEdit size={20} color="white" />
                    </IconButton>
                    <IconButton
                      onClick={() => onDelete(item?._id)}
                      color="red"
                      size="md"
                    >
                      <MdDelete size={20} color="white" />
                    </IconButton>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
