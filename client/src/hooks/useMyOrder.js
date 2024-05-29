import { useDispatch, useSelector } from "react-redux";
import useDebounce from "./useDebounce";
import { useEffect, useState } from "react";
import { getUserOrdersApi } from "../api/orderApi";

export default function useMyOrder() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginate, setPaginate] = useState({
    nextPage: 1,
    totalPages: 1,
    currentPage: 0,
  });
  const [filter, setFilter] = useState({
    query: "",
    order: "desc",
  });

  const searchQuery = useDebounce(filter.query, 500);

  useEffect(() => {
    async function fetchMyOrders() {
      setIsLoading(true);

      try {
        const res = await getUserOrdersApi({
          order: filter.order,
          userId: currentUser?._id,
        });
        setOrders(res);
      } catch (error) {
        console.log("Failed to fetchMyOrders: ", error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMyOrders();
  }, [currentUser?._id, dispatch, filter.order]);

  const handlePageClick = (event) => {
    setPaginate({
      ...paginate,
      currentPage: event.selected,
      nextPage: event.selected + 1,
    });
  };

  const filterOrders = orders?.docs?.filter((item) =>
    item?._id.includes(searchQuery)
  );

  return {
    filterOrders,
    handlePageClick,
    orders,
    setFilter,
    filter,
    paginate,
    isLoading,
  };
}
