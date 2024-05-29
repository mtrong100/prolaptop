import { useEffect, useState } from "react";
import { getProductDetailApi } from "../api/productApi";

export default function useGetProductDetail(productId) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProductDetail() {
      setIsLoading(true);

      try {
        const res = await getProductDetailApi(productId);
        setProduct(res);
      } catch (error) {
        console.log("Failed to fetchProductDetail: ", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProductDetail();
  }, [productId]);

  return { product, setProduct, isLoading };
}
