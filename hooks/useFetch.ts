import { truncate } from "fs";
import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error: any) {
        setError(error);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
