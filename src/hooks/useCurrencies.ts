import { EXCHANGE_URL, UPDATE_TIMEOUT } from "../settings";
import usePull from "./usePull";

export enum STATUS {
  PROGRESS,
  FINISHED,
  ERROR
}

export interface ExchangeResponse {
  base: string;
  date: string;
  rates: ExchangeRates;
}

export interface ExchangeRates {
  [key: string]: number;
}

const createReturn = (
  status: STATUS,
  supportedRates: ExchangeRates = {},
  baseCurrency = "",
  updateDate = ""
) => ({
  status,
  baseCurrency,
  supportedRates,
  updateDate
});

const useCurrencies = () => {
  const { response, error } = usePull<ExchangeResponse>(EXCHANGE_URL, UPDATE_TIMEOUT);

  if (error) {
      return createReturn(STATUS.ERROR);
  }

  if (response) {
    const supportedRates = {
      ...response.rates,
      [response.base]: 1
    };

    const baseCurrency = response.base;
    const updateDate = response.date;

    return createReturn(STATUS.FINISHED, supportedRates, baseCurrency, updateDate);
  }

  return createReturn(STATUS.PROGRESS);
};

export default useCurrencies;
