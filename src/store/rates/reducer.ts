import { RatesActionTypes, FETCH_FINISHED, FETCH_ERROR, ExchangeRates } from "./types";

export enum STATUS {
  INIT,
  FINISHED,
  ERROR
}

export interface RatesState {
  rates: ExchangeRates;
  date: string;
  error: Error | null;
  baseCurrency: string;
  status: STATUS;
}

const initialState: RatesState = {
  rates: {},
  date: "",
  baseCurrency: "",
  error: null,
  status: STATUS.INIT
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
        status: STATUS.FINISHED
      };
    case FETCH_ERROR:
      return {
        ...state,
        status: STATUS.ERROR,
        error: action.payload.error
      };
    default:
      return state;
  }
}
