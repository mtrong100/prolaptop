import React from "react";
import TitleSection from "../components/TitleSection";
import useGetAllProducts from "../hooks/useGetAllReviews";
import {
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Chip,
  IconButton,
  Select,
  Option,
  Input,
  Drawer,
  Rating,
} from "@material-tailwind/react";
import { IoEye } from "react-icons/io5";
import useGetReviewsFromProduct from "../hooks/useGetReviewsFromProduct";
import { formatDate } from "../utils/helper";

const ManageReview = () => {
  const { loading, reviews } = useGetAllProducts();

  return (
    <div>
      <TitleSection>Quản lí phản hồi</TitleSection>

      <div className="mt-5">
        <TableWithStripedRows results={reviews} />
      </div>
    </div>
  );
};

export default ManageReview;

const TableWithStripedRows = ({ results = [] }) => {
  return (
    <div className="h-full w-full">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Hình ảnh
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Sản phẩm
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Tổng đánh giá
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {results?.map((item) => (
            <tr key={item?._id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <div className="w-[60px] h-[60px]">
                  <img
                    src={item?.thumbnail}
                    alt={item?.name}
                    className="img-cover"
                  />
                </div>
              </td>
              <td className="p-4">
                <div className="w-full max-w-lg">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item?.name}
                  </Typography>
                </div>
              </td>
              <td className="p-4">3</td>

              <td className="p-4 ">
                <div className="flex items-center gap-2">
                  <DrawerPlacement item={item} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export function DrawerPlacement({ item }) {
  const [openRight, setOpenRight] = React.useState(false);

  const { reviews, isLoading } = useGetReviewsFromProduct(item?._id);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-4">
        <IconButton
          color="blue"
          size="md"
          onClick={openDrawerRight}
          variant="filled"
        >
          <IoEye size={20} color="white" />
        </IconButton>
      </div>
      <Drawer
        size={600}
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4 overflow-y-auto"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Phản hồi của người dùng
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerRight}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div>
          <ul className="flex flex-col gap-5">
            {!isLoading &&
              reviews?.docs?.length > 0 &&
              reviews?.docs?.map((item) => (
                <UserComment key={item?._id} item={item} />
              ))}
          </ul>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

function UserComment({ item }) {
  return (
    <li className="flex items-start gap-3">
      <div className="flex-shrink-0 w-[40px] h-[40px]">
        <img
          src={item?.user?.avatar}
          alt={item?.user?.name}
          className="img-cover rounded-full"
        />
      </div>

      <div className="space-y-1">
        <div className="space-y-1">
          <Typography variant="h6">{item?.user?.name}</Typography>
          <Rating value={Number(item?.rate)} readonly />
          <Typography variant="small">
            Ngày: {formatDate(item?.createdAt)}
          </Typography>
        </div>

        <Typography variant="paragraph">{item?.comment}</Typography>
      </div>
    </li>
  );
}
