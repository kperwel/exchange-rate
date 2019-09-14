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
    AUD: Big("1000.00"),
    BGN: Big("1000.00"),
    BRL: Big("1000.00"),
    CAD: Big("1000.00"),
    CHF: Big("1000.00"),
    CNY: Big("1000.00"),
    CZK: Big("1000.00"),
    DKK: Big("1000.00"),
    GBP: Big("1000.00"),
    HKD: Big("1000.00"),
    HRK: Big("1000.00"),
    HUF: Big("1000.00"),
    IDR: Big("1000.00"),
    ILS: Big("1000.00"),
    INR: Big("1000.00"),
    ISK: Big("1000.00"),
    JPY: Big("1000.00"),
    KRW: Big("1000.00"),
    MXN: Big("1000.00"),
    MYR: Big("1000.00"),
    NOK: Big("1000.00"),
    NZD: Big("1000.00"),
    PHP: Big("1000.00"),
    PLN: Big("1000.00"),
    RON: Big("1000.00"),
    RUB: Big("1000.00"),
    SEK: Big("1000.00"),
    SGD: Big("1000.00"),
    THB: Big("1000.00"),
    USD: Big("1000.00"),
    ZAR: Big("1000.00"),
    TRY: Big("1000.00"),
    EUR: Big("1000.00"),
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
