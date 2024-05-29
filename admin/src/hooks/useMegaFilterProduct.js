import { useEffect } from "react";
import { useState } from "react";
import useDebounce from "./useDebounce";
import { getAllProductsApi } from "../../../client/src/api/productApi";

export default function useMegaFilterProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceFilter, setPriceFilter] = useState({
    minPrice: undefined,
    maxPrice: undefined,
  });
  const [filter, setFilter] = useState({
    query: "",
    brand: "",
    category: "",
    ram: "",
    cpu: "",
    hardDrive: "",
    graphicCard: "",
    screen: "",
    color: "",
    order: "",
  });
  const searchQuery = useDebounce(filter.query, 300);
  const [paginate, setPaginate] = useState({
    totalPages: 1,
    currentPage: 1,
    totalDocs: 0,
  });

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { minPrice, maxPrice } = priceFilter;
      const {
        brand,
        category,
        ram,
        cpu,
        hardDrive,
        graphicCard,
        screen,
        color,
        order,
      } = filter;

      try {
        const res = await getAllProductsApi({
          page: paginate.currentPage,
          query: searchQuery,
          brand,
          category,
          ram,
          cpu,
          hardDrive,
          graphicCard,
          screen,
          color,
          minPrice,
          maxPrice,
          order,
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
  }, [filter, paginate.currentPage, priceFilter, searchQuery]);

  const handleResetFilter = () => {
    window.location.reload();
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
    setFilter,
    filter,
    priceFilter,
    setPriceFilter,
    paginate,
    setPaginate,
    handleNextPage,
    handlePrevPage,
    handleResetFilter,
  };
}
