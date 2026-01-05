import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0); // 🔑 Trigger for refetch

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 🔑 Set loading on refetch too
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null); // 🔑 Clear previous errors
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, refetchTrigger]); // 🔑 Re-run when refetchTrigger changes

  // 🔑 Function to trigger refetch
  const refetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  return { data, loading, error, refetch }; // 🔑 Return refetch function
};

export default useFetch;
