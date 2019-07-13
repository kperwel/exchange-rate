import { UserActionTypes, CURRENCY_CHANGE, VALUE_CHANGE, EXCHANGE, SWAP_CURRENCIES } from "./types";
import Big from "big.js";
import produce from "immer";
import { Currency } from "../../types";

interface Balance {
  [currency: string]: Big;
}

export enum MessageType {
  ERROR,
  WARNING,
  SUCCESS
}

export enum CurrencyType {
  SOURCE = "SOURCE",
  TARGET = "TARGET"
}

export interface UserState {
  [CurrencyType.SOURCE]: Currency;
  [CurrencyType.TARGET]: Currency;
  value: [string, Currency];
  balance: Balance;
}

const initialState: UserState = {
  [CurrencyType.SOURCE]: "EUR",
  [CurrencyType.TARGET]: "PLN",
  value: ["0.00", "EUR"],
  balance: {
    EUR: Big("1000.00"),
    PLN: Big("200.00")
  }
};

export default function userReducer(state = initialState, action: UserActionTypes): UserState {
  switch (action.type) {
    case CURRENCY_CHANGE:
      return {
        ...state,
        [action.payload.currencyType]: action.payload.currency
      };
    case VALUE_CHANGE:
      return {
        ...state,
        value: action.payload.value
      };
    case SWAP_CURRENCIES:
      return {
        ...state,
        [CurrencyType.SOURCE]: state[CurrencyType.TARGET],
        [CurrencyType.TARGET]: state[CurrencyType.SOURCE]
      };
    case EXCHANGE:
      const {
        payload: { sourceCurrency, targetCurrency, value, valueRate, sourceRate, targetRate }
      } = action;

      return produce(state, draftState => {
        draftState.balance[sourceCurrency] = draftState.balance[sourceCurrency] || Big("0");
        draftState.balance[targetCurrency] = draftState.balance[targetCurrency] || Big("0");

        const paidValue = Big(value[0])
          .div(valueRate)
          .mul(sourceRate);

        if (draftState.balance[sourceCurrency].gte(paidValue)) {
          const gotValue = Big(value[0])
            .div(valueRate)
            .mul(targetRate);
          draftState.value = ["0.00", value[1]];
          draftState.balance[sourceCurrency] = draftState.balance[sourceCurrency].sub(paidValue);
          draftState.balance[targetCurrency] = draftState.balance[targetCurrency].add(gotValue);
        }
      });
    default:
      return state;
  }
}
