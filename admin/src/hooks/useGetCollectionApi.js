import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetCollectionApi(collectionName) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCollection() {
      setLoading(true);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/${collectionName}/collection`,
          {
            withCredentials: true,
          }
        );

        setResults(res.data);
      } catch (error) {
        console.log("Failed to fetch collection API: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCollection();
  }, [collectionName]);

  return { results, loading };
}
