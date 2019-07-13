import { useEffect } from "react";
import { useDispatch } from "react-redux";
import usePull from "../hooks/usePull";
import { fetchRatesError, fetchRatesFinished } from "../store/rates/actions";

export interface ExchangeResponse {
  base: string;
  date: string;
  rates: ExchangeRates;
}

export interface ExchangeRates {
  [key: string]: number;
}

interface ExchangeRateFetcherProps {
  interval: number;
  url: string;
}

const ExchangeRateFetcher = ({ interval, url }: ExchangeRateFetcherProps) => {
  const { response, error } = usePull<ExchangeResponse>(url, interval);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(fetchRatesError(error));
    } else if (response) {
      dispatch(fetchRatesFinished(response));
    }
  }, [response, error, dispatch]);

  return null;
};

export default ExchangeRateFetcher;
