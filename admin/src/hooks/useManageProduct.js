import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import {
  deleteProductApi,
  flashSaleProductApi,
  getAllProductsApi,
} from "../api/productApi";
import Swal from "sweetalert2";

export default function useManageProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const searchQuery = useDebounce(query, 300);
  const [paginate, setPaginate] = useState({
    totalPages: 1,
    currentPage: 1,
    totalDocs: 0,
  });

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      try {
        const res = await getAllProductsApi({
          page: paginate.currentPage,
          query: searchQuery,
        });

        setPaginate((prev) => ({
          ...prev,
          totalPages: res?.totalPages,
          totalDocs: res?.totalDocs,
        }));
        setProducts(res?.docs);
      } catch (error) {
        console.log("Lỗi fetch data sản phẩm: ", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [searchQuery, paginate.currentPage]);

  const handleSwitchFlashSale = async (productId) => {
    try {
      await flashSaleProductApi(productId);
      const res = await getAllProductsApi();
      setProducts(res?.docs);
    } catch (error) {
      console.log("Lỗi set sản phẩm thành flashsale: ", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
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
          await deleteProductApi(productId);
          const res = await getAllProductsApi();
          setProducts(res?.docs);
          Swal.fire("Đã xóa!", "Sản phẩm của bạn đã được xóa.", "success");
        } catch (error) {
          console.log("Xóa sản phẩm thất bại ", error);
          Swal.fire("Lỗi!", "Xóa sản phẩm thất bại.", "error");
        }
      }
    });
  };

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleNextPage = () => {
    if (paginate.currentPage < paginate.totalPages) {
      setPaginate((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (paginate.currentPage > 1) {
      setPaginate((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  return {
    products,
    loading,
    query,
    setQuery,
    setProducts,
    handleSwitchFlashSale,
    handleQuery,
    handleDeleteProduct,
    handleNextPage,
    handlePrevPage,
    paginate,
  };
}
