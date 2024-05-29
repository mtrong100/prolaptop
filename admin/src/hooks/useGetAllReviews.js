import { useEffect, useState } from "react";
import { getAllReviews } from "../api/reviewApi";

export default function useGetAllProducts() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const res = await getAllReviews();
        setReviews(res);
      } catch (error) {
        console.log("Lỗi fetch data review: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  return { loading, reviews };
}
