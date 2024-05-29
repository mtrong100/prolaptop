import useDebounce from "./useDebounce";
import { useEffect, useState } from "react";
import { getAllProductsApi } from "../api/productApi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCheckedCategory } from "../redux/slices/globalSlice";

export default function useProduct() {
  const dispatch = useDispatch();
  const { checkedCategory } = useSelector((state) => state.global);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilteringPrice, setIsFileringPrice] = useState(false);
  const [paginate, setPaginate] = useState({
    nextPage: 1,
    totalPages: 1,
    currentPage: 0,
  });
  const [filter, setFilter] = useState({
    query: "",
    category: checkedCategory || "",
    color: "",
    size: "",
    brand: "",
    order: "desc",
    minPrice: undefined,
    maxPrice: undefined,
  });

  const searchQuery = useDebounce(filter.query, 500);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);

      try {
        const { category, color, size, brand, order } = filter;
        const { nextPage } = paginate;

        const res = await getAllProductsApi({
          category,
          color,
          size,
          brand,
          order,
          query: searchQuery,
          page: nextPage,
        });

        setProducts(res);
      } catch (error) {
        console.log("Failed to fetch products: ", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [filter, paginate, searchQuery]);

  const handdleFilteringPrice = async () => {
    const { category, color, size, brand, order, minPrice, maxPrice } = filter;
    const { nextPage } = paginate;

    if (
      (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) ||
      (minPrice && maxPrice && Number(maxPrice) < Number(minPrice))
    ) {
      toast.error("Wrong format filter");
      return;
    }

    setIsFileringPrice(true);

    try {
      const res = await getAllProductsApi({
        category,
        color,
        size,
        brand,
        order,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        query: searchQuery,
        page: nextPage,
      });

      setProducts(res);
      toast.success("Filter Completed");
    } catch (error) {
      console.log("Failed to fetch products: ", error);
      toast.error("Failed to filter products");
      setProducts([]);
    } finally {
      setIsFileringPrice(false);
    }
  };

  const handlePageClick = (event) => {
    setPaginate({
      ...paginate,
      currentPage: event.selected,
      nextPage: event.selected + 1,
    });
  };

  const handleResetFilter = () => {
    dispatch(setCheckedCategory(""));
    setFilter({
      query: "",
      category: "",
      color: "",
      size: "",
      brand: "",
      order: "desc",
      minPrice: undefined,
      maxPrice: undefined,
    });
  };

  return {
    handdleFilteringPrice,
    handlePageClick,
    products,
    isLoading,
    setIsFileringPrice,
    isFilteringPrice,
    setFilter,
    filter,
    setPaginate,
    paginate,
    handleResetFilter,
  };
}
