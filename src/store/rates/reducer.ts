import { RatesActionTypes, FETCH_FINISHED, FETCH_ERROR, ExchangeRates } from "./types";

export enum Status {
  INIT = "INIT",
  FINISHED = "FINISHED",
  ERROR = "ERROR"
}

export interface RatesState {
  rates: ExchangeRates;
  date: string;
  error: Error | null;
  baseCurrency: string;
  status: Status;
}

const initialState: RatesState = {
  rates: {},
  date: "",
  baseCurrency: "",
  error: null,
  status: Status.INIT
};

export default function userReducer(state = initialState, action: RatesActionTypes): RatesState {
  switch (action.type) {
    case FETCH_FINISHED:
      return {
        ...state,
        rates: {
          ...action.payload.response.rates,
          [action.payload.response.base]: 1
        },
        date: action.payload.response.date,
        baseCurrency: action.payload.response.base,
        status: Status.FINISHED
      };
    case FETCH_ERROR:
      return {
        ...state,
        status: Status.ERROR,
        error: action.payload.error
      };
    default:
      return state;
  }
}
