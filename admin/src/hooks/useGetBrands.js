import { useEffect, useState } from "react";
import { getBrandsApi } from "../api/brandApi";

export default function useGetBrands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBrands() {
      setLoading(true);
      try {
        const res = await getBrandsApi();
        setBrands(res);
      } catch (error) {
        setLoading(false);
        console.log("Lỗi fetch data thương hiệu: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  return { brands, loading };
}
