import useFetch from "./useFetch";
import { useInterval } from "./useInterval";

const EXCHANGE_URL = "https://api.exchangeratesapi.io/latest";

type ExchangeResponseType = {
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
};

function useExchangeRates() {
  const { response, error, refetch } = useFetch<ExchangeResponseType>(EXCHANGE_URL);
  useInterval(refetch, 10000);

  if (error) {
      console.error(error);
  }

  return response;
}

export default useExchangeRates;
