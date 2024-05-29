import { useEffect, useState } from "react";
import { cancelOrderApi, getUserOrdersApi } from "../api/orderApi";
import { useSelector } from "react-redux";
import useDebounce from "../../../admin/src/hooks/useDebounce";
import { toast } from "react-toastify";

export default function useGetMyOrder() {
  const [myorders, setMyorders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [query, setQuery] = useState("");
  const searchQuery = useDebounce(query, 300);
  const [canceling, setCanceling] = useState(false);
  const [status, setStatus] = useState(null);
  const [paginate, setPaginate] = useState({
    totalPages: 1,
    currentPage: 1,
    totalDocs: 0,
  });

  useEffect(() => {
    async function fetchMyorder() {
      setLoading(true);
      try {
        const res = await getUserOrdersApi({
          page: paginate.currentPage,
          userId: currentUser?._id,
          status,
        });

        setPaginate((prev) => ({
          ...prev,
          totalPages: res?.totalPages,
          totalDocs: res?.totalDocs,
        }));
        setMyorders(res?.docs);
      } catch (error) {
        console.log("Lỗi fetch data đơn hàng: ", error);
        setMyorders([]);
      } finally {
        setLoading(false);
      }
    }
    fetchMyorder();
  }, [currentUser?._id, paginate.currentPage, status]);

  const filterMyorders = myorders.filter((item) =>
    item?._id.includes(searchQuery)
  );

  const handleQueryOrder = (e) => {
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

  const handleCancelOrder = async (orderId) => {
    setCanceling(true);
    try {
      const res = await cancelOrderApi(orderId);
      toast.success(res?.message);
      const data = await getUserOrdersApi({
        userId: currentUser?._id,
      });
      setMyorders(data?.docs);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Failed to cancel order: ", error);
    } finally {
      setCanceling(false);
    }
  };

  return {
    loading,
    myorders,
    query,
    filterMyorders,
    handleNextPage,
    handlePrevPage,
    handleQueryOrder,
    paginate,
    handleCancelOrder,
    canceling,
    setStatus,
    status,
  };
}
