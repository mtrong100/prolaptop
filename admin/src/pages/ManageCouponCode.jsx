import React, { useEffect, useState } from "react";
import TitleSection from "../components/TitleSection";
import {
  Input,
  Button,
  Card,
  Typography,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { formatDate } from "../utils/helper";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import {
  addNewCategoryApi,
  deleteCategoryApi,
  getCategoriesApi,
  updateCategoryApi,
} from "../api/catgegoryApi";
import { toast } from "react-toastify";
import { IoSearchOutline } from "react-icons/io5";
import {
  createCouponCodeApi,
  deleteCouponCodeApi,
  getCouponCodeApi,
  updateCouponCodeApi,
} from "../api/couponCodeApi";

const TABLE_HEAD = ["ID", "Tên", "Phần trăm giảm", "Ngày thêm", "Thao tác"];

const ManageCouponCode = () => {
  const [val, setVal] = useState("");
  const [numVal, setNumVal] = useState(0);
  const [couponCodes, setCouponCodes] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchCouponCodes();
  }, []);

  async function fetchCouponCodes() {
    setLoading(true);
    try {
      const res = await getCouponCodeApi();
      setCouponCodes(res);
    } catch (error) {
      setLoading(false);
      console.log("Lỗi fetch data mả giảm giá: ", error);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateCouponCode = async () => {
    if (!val.trim() && !numVal.trim()) {
      toast.error("Không được để trống");
      return;
    }

    setIsAdding(true);

    try {
      const res = await createCouponCodeApi({ name: val, discount: numVal });
      setCouponCodes((prev) => [...prev, res]);
      setVal("");
      toast.success("Thêm mới mã giảm giá hoàn tất");
    } catch (error) {
      toast.error("Lỗi thêm mới mã giảm giá");
      console.log("Lỗi thêm mới mã giảm giá: ", error);
    } finally {
      setIsAdding(false);
    }
  };

  const filterCategories = couponCodes.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <TitleSection>Quản lí mã giảm giá</TitleSection>

      <div className="flex items-center justify-between mt-5">
        <div className=" w-full max-w-[600px] flex items-center gap-1">
          <Input
            size="lg"
            color="blue"
            label="Tên mã giảm giá"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <Input
            type="number"
            size="lg"
            color="blue"
            label="Phần trăm giảm"
            value={numVal}
            onChange={(e) => setNumVal(e.target.value)}
          />
          <Button
            color="blue"
            type="submit"
            disabled={isAdding}
            onClick={handleCreateCouponCode}
            className="w-[200px] h-[44px] flex items-center justify-center"
          >
            {isAdding ? "Loading..." : "Thêm mới"}
          </Button>
        </div>

        <div className="flex items-center gap-1 w-full max-w-xs">
          <Input
            size="lg"
            color="blue"
            label="Tìm kiếm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
          <IconButton size="md" className="flex-shrink-0 h-[44px]">
            <IoSearchOutline size={20} color="white" />
          </IconButton>
        </div>
      </div>

      <div className="mt-8">
        <TableWithStripedRows
          categories={filterCategories}
          setCouponCodes={setCouponCodes}
        />
      </div>
    </div>
  );
};

export default ManageCouponCode;

export function TableWithStripedRows({ categories = [], setCouponCodes }) {
  const handleDeleteCouponCode = async (id) => {
    try {
      await deleteCouponCodeApi(id);
      const res = await getCouponCodeApi();
      setCouponCodes(res);
      toast.success("Xóa mã giảm giá hoàn tất");
    } catch (error) {
      toast.error("Lỗi xóa mã giảm giá");
      console.log("Lỗi xóa mã giảm giá: ", error);
    }
  };

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
          {categories.map((item) => {
            return (
              <tr key={item?._id} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item?._id}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item?.name}
                  </Typography>
                </td>
                <td className="p-4 ">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item?.discount}
                  </Typography>
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
                    <UpdateModal item={item} setCouponCodes={setCouponCodes} />
                    <IconButton
                      color="red"
                      size="md"
                      onClick={() => handleDeleteCouponCode(item?._id)}
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
    </Card>
  );
}

const UpdateModal = ({ item, setCouponCodes }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [val, setVal] = useState("");
  const [numVal, setNumVal] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (item) {
      setVal(item?.name);
      setNumVal(item?.discount);
    }
  }, [item]);

  const handleUpdateCategory = async () => {
    if (!val.trim() && !numVal.trim()) {
      toast.error("Không được để trống");
      return;
    }

    setIsUpdating(true);

    try {
      await updateCouponCodeApi(item?._id, { name: val, discount: numVal });

      const res = await getCouponCodeApi();
      setCouponCodes(res);

      toast.success("Cập nhật mã giảm giá hoàn tất");
    } catch (error) {
      toast.error("Lỗi cập nhật mã giảm giá");
      console.log("Lỗi cập nhật mã giảm giá: ", error);
    } finally {
      setIsUpdating(false);
      handleOpen();
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen} color="green" size="md">
        <MdOutlineEdit size={20} color="white" />
      </IconButton>
      <Dialog open={open} size="sm">
        <DialogHeader className="text-xl">Cập nhật Mã giảm giá</DialogHeader>
        <DialogBody className="space-y-5">
          <Input
            size="lg"
            color="blue"
            label="Mã giảm giá"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <Input
            type="number"
            size="lg"
            color="blue"
            label="Phần trăm giảm"
            value={numVal}
            onChange={(e) => setNumVal(e.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Hủy</span>
          </Button>
          <Button
            disabled={isUpdating}
            variant="gradient"
            color="green"
            onClick={handleUpdateCategory}
          >
            <span>Cập nhật</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
