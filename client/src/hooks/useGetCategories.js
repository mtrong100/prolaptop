import { useEffect, useState } from "react";
import { getCategoriesApi } from "../api/catgegoryApi";

export default function useGetCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const res = await getCategoriesApi();
        setCategories(res);
      } catch (error) {
        setLoading(false);
        console.log("Lỗi fetch data danh mục: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return { categories, loading };
}
