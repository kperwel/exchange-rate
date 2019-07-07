import { CURRENCY_TYPE } from "./reducer";
import { Transation } from "./transaction";

export const CURRENCY_CHANGE = "CURRENCY_CHANGE";
export const VALUE_CHANGE = "VALUE_CHANGE";
export const EXCHANGE = "EXCHANGE";

interface CurrencyChange {
  type: typeof CURRENCY_CHANGE;
  payload: {
    currency: string;
    currencyType: CURRENCY_TYPE;
  }
}

interface ValueChange {
  type: typeof VALUE_CHANGE;
  payload: {
    value: [string, string];
  }
}

interface Exchange {
  type: typeof EXCHANGE;
  payload: Transation;
}

export type UserActionTypes = CurrencyChange | ValueChange | Exchange;
