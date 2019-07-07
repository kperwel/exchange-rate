import { RatesActionTypes, FETCH_FINISHED, FETCH_ERROR, ExchangeResponse } from "./types";

export function fetchRatesError(error: Error): RatesActionTypes {
  return {
    type: FETCH_ERROR,
    payload: { error }
  };
}

export function fetchRatesFinished(response: ExchangeResponse): RatesActionTypes {
  return {
    type: FETCH_FINISHED,
    payload: { response }
  };
}
