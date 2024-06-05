import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  createBrandApi,
  deleteBrandApi,
  getBrandsApi,
  updateBrandApi,
} from "../api/brandApi";

export default function useManageBrands() {
  const [brands, setBrands] = useState([]);
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
    async function fetchBrands() {
      setLoading(true);
      try {
        const res = await getBrandsApi();
        setBrands(res);
      } catch (error) {
        setLoading(false);
        console.log("Lỗi fetch data thương hiệu: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  const handleOpen = () => setOpen(!open);

  const filterBrands = brands.filter((item) =>
    item?.name?.toLowerCase().includes(query.toLowerCase())
  );

  const handleCreateBrand = async () => {
    if (!val.trim()) {
      toast.error("Thương hiệu không được để trống");
      return;
    }

    setIsAdding(true);

    try {
      await createBrandApi({ name: val });
      const res = await getBrandsApi();
      setBrands(res);
      setVal("");
      toast.success("Thêm mới thương hiệu hoàn tất");
    } catch (error) {
      toast.error("Lỗi thêm mới thương hiệu");
      console.log("Lỗi thêm mới thương hiệu: ", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteBrand = async (brandId) => {
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
          await deleteBrandApi(brandId);
          const res = await getBrandsApi();
          setBrands(res);
          Swal.fire("Đã xóa!", "Thương hiệu của bạn đã được xóa.", "success");
        } catch (error) {
          console.log("Lỗi xóa thương hiệu: ", error);
          Swal.fire("Lỗi!", error?.response?.data?.error, "error");
        }
      }
    });
  };

  const handleUpdateBrand = async () => {
    if (!updateVal.name.trim()) {
      toast.error("Thương hiệu không được để trống");
      return;
    }

    setIsUpdating(true);

    try {
      await updateBrandApi(updateVal._id, { name: updateVal.name });
      const res = await getBrandsApi();
      setBrands(res);
      toast.success("Cập nhật thương hiệu hoàn tất");
    } catch (error) {
      toast.error("Lỗi cập nhật thương hiệu");
      console.log("Lỗi cập nhật thương hiệu: ", error);
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
    brands,
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
    filterBrands,
    handleCreateBrand,
    handleDeleteBrand,
    handleUpdateBrand,
    handleOpenDialog,
    handleOpen,
  };
}
