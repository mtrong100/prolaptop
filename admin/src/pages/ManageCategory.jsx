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

const TABLE_HEAD = ["ID", "Tên", "Ngày thêm", "Thao tác"];

const ManageCategory = () => {
  const [val, setVal] = useState("");
  const [categories, setCategories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await getCategoriesApi();
      setCategories(res);
    } catch (error) {
      setLoading(false);
      console.log("Lỗi fetch data danh mục: ", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddNewCategory = async () => {
    if (!val.trim()) {
      toast.error("Danh mục không được để trống");
      return;
    }

    setIsAdding(true);

    try {
      const res = await addNewCategoryApi({ name: val });
      setCategories((prevCategories) => [...prevCategories, res]);
      setVal("");
      toast.success("Thêm mới danh mục hoàn tất");
    } catch (error) {
      toast.error("Lỗi thêm mới danh mục");
      console.log("Lỗi thêm mới danh mục: ", error);
    } finally {
      setIsAdding(false);
    }
  };

  const filterCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <TitleSection>Quản lí danh mục</TitleSection>

      <div className="flex items-center justify-between mt-5">
        <div className=" w-full max-w-[450px] flex items-center gap-1">
          <Input
            size="lg"
            color="blue"
            label="Danh mục"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <Button
            color="blue"
            type="submit"
            disabled={isAdding}
            onClick={handleAddNewCategory}
            className="w-[180px] h-[44px] flex items-center justify-center"
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
          setCategories={setCategories}
        />
      </div>
    </div>
  );
};

export default ManageCategory;

export function TableWithStripedRows({ categories = [], setCategories }) {
  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategoryApi(categoryId);
      const res = await getCategoriesApi();
      setCategories(res);
      toast.success("Xóa danh mục hoàn tất");
    } catch (error) {
      toast.error("Lỗi xóa danh mục");
      console.log("Lỗi xóa danh mục: ", error);
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
                    <UpdateModal
                      category={item}
                      setCategories={setCategories}
                    />
                    <IconButton
                      color="red"
                      size="md"
                      onClick={() => handleDeleteCategory(item?._id)}
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

const UpdateModal = ({ category, setCategories }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [val, setVal] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (category) {
      setVal(category?.name);
    }
  }, [category]);

  const handleUpdateCategory = async () => {
    if (!val.trim()) {
      toast.error("Danh mục không được để trống");
      return;
    }

    setIsUpdating(true);

    try {
      await updateCategoryApi(category?._id, { name: val });

      const res = await getCategoriesApi();
      setCategories(res);

      toast.success("Cập nhật danh mục hoàn tất");
    } catch (error) {
      toast.error("Lỗi cập nhật danh mục");
      console.log("Lỗi cập nhật danh mục: ", error);
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
        <DialogHeader className="text-xl">Cập nhật danh mục</DialogHeader>
        <DialogBody>
          <Input
            size="lg"
            color="blue"
            label="Danh mục"
            value={val}
            onChange={(e) => setVal(e.target.value)}
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
