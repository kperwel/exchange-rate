import { UserActionTypes, CURRENCY_CHANGE, VALUE_CHANGE, EXCHANGE } from "./types";
import Big from "big.js";
import produce from "immer";
import { Currency } from "../../types";

interface Balance {
  [currency: string]: Big;
}

export enum CURRENCY_TYPE {
  SOURCE,
  TARGET
}

export interface UserState {
  [CURRENCY_TYPE.SOURCE]: Currency;
  [CURRENCY_TYPE.TARGET]: Currency;
  value: [string, Currency];
  balance: Balance;
}

const initialState: UserState = {
  [CURRENCY_TYPE.SOURCE]: "EUR",
  [CURRENCY_TYPE.TARGET]: "PLN",
  value: ["0", "EUR"] as [string, string],
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
    case EXCHANGE:
      const { payload } = action;

      return produce(state, draftState => {
        draftState.balance[payload.sourceCurrency] =
          draftState.balance[payload.sourceCurrency] || Big("0");
        draftState.balance[payload.targetCurrency] =
          draftState.balance[payload.targetCurrency] || Big("0");

        const paidValue = Big(payload.value[0])
          .div(payload.valueRate)
          .mul(payload.sourceRate);

        if (draftState.balance[payload.sourceCurrency].gt(paidValue)) {
          const gotValue = Big(payload.value[0])
            .div(payload.valueRate)
            .mul(payload.targetRate);

          draftState.balance[payload.sourceCurrency] = draftState.balance[
            payload.sourceCurrency
          ].sub(paidValue);
          draftState.balance[payload.targetCurrency] = draftState.balance[
            payload.targetCurrency
          ].add(gotValue);
        }
      });
    default:
      return state;
  }
}
