import { useEffect, useState } from "react";
import { getflashsaleProductsApi } from "../api/productApi";

export default function useGetProductFlashsale() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await getflashsaleProductsApi();
        setProducts(res);
      } catch (error) {
        console.log("Lỗi fetch data sản phẩm flashsale: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return { loading, products };
}
