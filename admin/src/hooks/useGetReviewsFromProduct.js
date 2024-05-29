import { useEffect, useState } from "react";
import { getReviewsFromProductApi } from "../api/reviewApi";

export default function useGetReviewsFromProduct(productId) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      setIsLoading(true);

      try {
        const res = await getReviewsFromProductApi({ productId, limit: 99 });
        setReviews(res);
      } catch (error) {
        console.log("Lỗi fetch data đánh giá sản phẩm: ", error);
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, [productId]);

  return { reviews, isLoading };
}
