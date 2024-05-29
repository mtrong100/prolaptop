import useDebounce from "./useDebounce";
import { blockUserApi, deleteUserApi, getAllUserApi } from "../api/userApi";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function useManageUser() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginate, setPaginate] = useState({
    totalPages: 1,
    currentPage: 1,
    totalDocs: 0,
  });
  const [filter, setFilter] = useState({
    query: "",
    order: "desc",
  });

  const searchQuery = useDebounce(filter.query, 500);

  const filterUsers = users.filter((user) => user?.role !== "admin");

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);

      try {
        const res = await getAllUserApi({
          order: filter.order,
          query: searchQuery,
        });

        setPaginate((prev) => ({
          ...prev,
          totalPages: res?.totalPages,
          totalDocs: res?.totalDocs,
        }));
        setUsers(res?.docs);
      } catch (error) {
        console.log("Failed to fetchUsers: ", error);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, [filter.order, searchQuery]);

  const handleDeleteUser = async (userId) => {
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
          await deleteUserApi(userId);
          const res = await getAllUserApi();
          setUsers(res?.docs);
          Swal.fire("Đã xóa!", "Người dùng đã được xóa.", "success");
        } catch (error) {
          console.log("Xóa người dùng thất bại ", error);
          Swal.fire("Lỗi!", "Xóa người dùng thất bại.", "error");
        }
      }
    });
  };

  const handleBlockUser = async (userId) => {
    try {
      await blockUserApi(userId);
      const res = await getAllUserApi();
      setUsers(res?.docs);
    } catch (error) {
      console.log("Lỗi khóa người dùng: ", error);
    }
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
    handleNextPage,
    handlePrevPage,
    handleDeleteUser,
    handleBlockUser,
    filterUsers,
    isLoading,
    filter,
    setFilter,
    paginate,
  };
}
