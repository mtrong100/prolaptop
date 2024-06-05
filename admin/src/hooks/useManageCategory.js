import { useEffect, useState } from "react";
import {
  addNewCategoryApi,
  deleteCategoryApi,
  getCategoriesApi,
  updateCategoryApi,
} from "../api/catgegoryApi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function useManageCategory() {
  const [categories, setCategories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [val, setVal] = useState("");
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateVal, setUpdateVal] = useState({
    _id: "",
    name: "",
  });

  useEffect(() => {
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
    fetchCategories();
  }, []);

  const handleOpen = () => setOpen(!open);

  const filterCategories = categories.filter((item) =>
    item?.name?.toLowerCase().includes(query.toLowerCase())
  );

  const handleAddNewCategory = async () => {
    if (!val.trim()) {
      toast.error("Danh mục không được để trống");
      return;
    }

    setIsAdding(true);

    try {
      await addNewCategoryApi({ name: val });
      const res = await getCategoriesApi();
      setCategories(res);
      setVal("");
      toast.success("Thêm mới danh mục hoàn tất");
    } catch (error) {
      toast.error("Lỗi thêm mới danh mục");
      console.log("Lỗi thêm mới danh mục: ", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    Swal.fire({
      title: "Bạn có chắc chắn không?",
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, xóa nó!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategoryApi(categoryId);
          const res = await getCategoriesApi();
          setCategories(res);
          Swal.fire("Đã xóa!", "Danh mục của bạn đã được xóa.", "success");
        } catch (error) {
          console.log("Lỗi xóa danh mục: ", error);
          Swal.fire("Lỗi!", error?.response?.data?.error, "error");
        }
      }
    });
  };

  const handleUpdateCategory = async () => {
    if (!updateVal.name.trim()) {
      toast.error("Danh mục không được để trống");
      return;
    }

    setIsUpdating(true);

    try {
      await updateCategoryApi(updateVal._id, { name: updateVal.name });
      const res = await getCategoriesApi();
      setCategories(res);
      toast.success("Cập nhật danh mục hoàn tất");
    } catch (error) {
      toast.error("Lỗi cập nhật danh mục");
      console.log("Lỗi cập nhật danh mục: ", error);
    } finally {
      setIsUpdating(false);
      handleOpen();
      setUpdateVal({ _id: "", name: "" });
    }
  };

  const handleOpenDialog = (category) => {
    handleOpen();
    setUpdateVal((prev) => ({
      ...prev,
      name: category.name,
      _id: category._id,
    }));
  };

  return {
    categories,
    isAdding,
    isUpdating,
    loading,
    query,
    setQuery,
    val,
    setVal,
    updateVal,
    setUpdateVal,
    open,
    filterCategories,
    handleAddNewCategory,
    handleDeleteCategory,
    handleUpdateCategory,
    handleOpenDialog,
    handleOpen,
  };
}
