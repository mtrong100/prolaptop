import { useEffect, useState } from "react";
import { deleteOrderApi, getAllOrderApi } from "../api/orderApi";
import { useSelector } from "react-redux";
import useDebounce from "./useDebounce";
import Swal from "sweetalert2";

export default function useManageOrder() {
  const [myorders, setMyorders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [query, setQuery] = useState("");
  const searchQuery = useDebounce(query, 300);
  const [status, setStatus] = useState(null);
  const [paginate, setPaginate] = useState({
    totalPages: 1,
    currentPage: 1,
    totalDocs: 0,
  });

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const res = await getAllOrderApi({
          page: paginate.currentPage,
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
    fetchOrders();
  }, [currentUser._id, paginate.currentPage, status]);

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

  const handleDeleteOrder = async (orderId) => {
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
          await deleteOrderApi(orderId);
          const res = await getAllOrderApi();
          setMyorders(res?.docs);
          Swal.fire("Đã xóa!", "Đơn hàng của bạn đã được xóa.", "success");
        } catch (error) {
          console.log("Xóa Đơn hàng thất bại ", error);
          Swal.fire("Lỗi!", "Xóa Đơn hàng thất bại.", "error");
        }
      }
    });
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
    setStatus,
    status,
    handleDeleteOrder,
  };
}
