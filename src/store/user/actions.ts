import { UserActionTypes, CURRENCY_CHANGE, VALUE_CHANGE, EXCHANGE, SWAP_CURRENCIES } from "./types";
import { CURRENCY_TYPE } from "./reducer";

import { Transation } from "./transaction";

export function currencyChange(currency: string, currencyType: CURRENCY_TYPE): UserActionTypes {
  return {
    type: CURRENCY_CHANGE,
    payload: {
      currency,
      currencyType
    }
  };
}

export function exchange(transation: Transation): UserActionTypes {
  return {
    type: EXCHANGE,
    payload: transation
  };
}

export function swap(): UserActionTypes {
  return {
    type: SWAP_CURRENCIES,
  };
}

export function valueChange(value: [string, string]): UserActionTypes {
  return {
    type: VALUE_CHANGE,
    payload: {
      value
    }
  };
}
