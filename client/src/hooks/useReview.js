import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createReviewApi,
  deleteReviewApi,
  getReviewsFromProductApi,
} from "../api/reviewApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function useReview() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [val, setVal] = useState("");
  const [rating, setRating] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    async function fetchReviews() {
      setIsLoading(true);

      try {
        const res = await getReviewsFromProductApi({ limit, productId });
        setReviews(res);
      } catch (error) {
        console.log("Lỗi fetch data đánh giá sản phẩm: ", error);
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, [dispatch, limit, productId]);

  const handleWriteReview = async (productId) => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập");
      navigate("/login");
      return;
    }

    if (!val.trim()) {
      toast.info("Không được để trống");
      return;
    }

    if (!rating) {
      toast.info("Vui lòng đánh giá sản phẩm");
      return;
    }

    setIsAdding(true);

    try {
      const req = {
        user: currentUser?._id,
        product: productId,
        comment: val,
        rate: rating,
      };

      await createReviewApi(req);
      const res = await getReviewsFromProductApi({ limit, productId });
      setReviews(res);
      setVal("");
      toast.success("Đã thêm đánh giá mới");
    } catch (error) {
      console.log("Lỗi: ", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập");
      navigate("/login");
      return;
    }

    setIsDeleting(true);

    try {
      await deleteReviewApi(reviewId);
      const res = await getReviewsFromProductApi({ limit, productId });
      setReviews(res);
      toast.success("Đã xóa đánh giá của bạn");
    } catch (error) {
      console.log("Lỗi: ", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLoadMoreReview = () => {
    setLimit((prev) => prev + 5);
  };

  return {
    handleDeleteReview,
    handleWriteReview,
    handleLoadMoreReview,
    limit,
    setLimit,
    setVal,
    val,
    setRating,
    rating,
    reviews,
    isLoading,
    isAdding,
    isDeleting,
  };
}
