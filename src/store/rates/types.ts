export const FETCH_PROGRESS = "FETCH_PROGRESS";
export const FETCH_FINISHED = "FETCH_FINISHED";
export const FETCH_ERROR = "FETCH_ERROR";

export interface ExchangeRates {
  [key: string]: number;
}

export interface ExchangeResponse {
  base: string;
  date: string;
  rates: ExchangeRates;
}

interface RatesFetchErrorAction {
  type: typeof FETCH_ERROR;
  payload: { error: Error };
}

interface RatesFetchFinished {
  type: typeof FETCH_FINISHED;
  payload: { response: ExchangeResponse };
}

export type RatesActionTypes = RatesFetchErrorAction | RatesFetchFinished;
