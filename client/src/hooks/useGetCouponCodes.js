import { useEffect, useState } from "react";
import { getCouponCodeApi } from "../api/couponCodeApi";

export default function useGetCouponCodes() {
  const [couponCodes, setCouponCodes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCouponCodes() {
      setLoading(true);
      try {
        const res = await getCouponCodeApi();
        setCouponCodes(res);
      } catch (error) {
        setLoading(false);
        console.log("Lỗi fetch data mả giảm giá: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCouponCodes();
  }, []);

  return { couponCodes, loading };
}
