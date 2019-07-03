import useFetch from "./useFetch";
import { useInterval } from "./useInterval";

function usePull<ResponseDataType>(url: string, time = 10000) {
  const { response, error, refetch } = useFetch<ResponseDataType>(url);
  useInterval(refetch, time);

  if (error) {
      console.error(error);
  }

  return { response, error };
}

export default usePull;
