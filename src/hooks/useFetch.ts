import { useState, useEffect } from "react";

interface FetchResultType<ResponseType> {
    response: ResponseType | null,
    error: Error | null,
    refetch: () => void,
}

const useFetch = <ResponseType>(url: string, options?: RequestInit): FetchResultType<ResponseType> => {
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [error, setError] = useState<Error| null>(null);
  const [fetchId, setFetchId] = useState<Symbol>(Symbol());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setResponse(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [fetchId, url, options]);

  const refetch = () => {
      setFetchId(Symbol());
  }

  return { response, error, refetch };
};

export default useFetch;