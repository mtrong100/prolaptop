import { useEffect, useState } from "react";
import { getAllProductsApi } from "../api/productApi";

export default function useGetRelatedProducts(brand, limit = 6) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchRelatedProducts() {
      setIsLoading(true);

      try {
        const res = await getAllProductsApi({ brand, limit });
        setRelatedProducts(res?.docs);
      } catch (error) {
        console.log("Lỗi: ", error);
        setRelatedProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRelatedProducts();
  }, [brand, limit]);

  return { relatedProducts, setRelatedProducts, isLoading };
}
