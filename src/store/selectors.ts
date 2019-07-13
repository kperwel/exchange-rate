import Big from "big.js";
import { createSelector } from "reselect";
import { CombinedState } from "./types";
import { CurrencyType } from "./user/reducer";
import { createTransaction } from "./user/transaction";

export const getSourceCurrency = (state: CombinedState) => state.user[CurrencyType.SOURCE];
export const getTargetCurrency = (state: CombinedState) => state.user[CurrencyType.TARGET];

export const getRatesFetchStatus = (state: CombinedState) => state.rates.status;
export const getExchangeRates = (state: CombinedState) => state.rates.rates;
export const getValue = (state: CombinedState) => state.user.value;
export const getBalance = (state: CombinedState) => state.user.balance;

export const getSourceBalance = createSelector(
  getBalance,
  getSourceCurrency,
  (balance, currency) => (balance[currency] ? balance[currency] : Big(0))
);

export const getTargetBalance = createSelector(
  getBalance,
  getTargetCurrency,
  (balance, currency) => (balance[currency] ? balance[currency] : Big(0))
);

export const getSourceRate = createSelector(
  getExchangeRates,
  getSourceCurrency,
  (rates, currency) => rates[currency]
);

export const getTargetRate = createSelector(
  getExchangeRates,
  getTargetCurrency,
  (rates, currency) => rates[currency]
);

export const getCurrencies = createSelector(
  getExchangeRates,
  rates => Object.keys(rates)
);

export const getValueRate = createSelector(
  getValue,
  getExchangeRates,
  (value, rates) => rates[value[1]]
);

export const getTransaction = createSelector(
  getValue,
  getValueRate,
  getSourceRate,
  getSourceCurrency,
  getTargetRate,
  getTargetCurrency,
  createTransaction
);

export const getTransactionValidationError = createSelector(
  getTransaction,
  getSourceBalance,
  ({ value, valueRate, sourceRate }, sourceBalance) => {
    if (!value[0]) {
      return "Provide value";
    } else if (Big(value[0]).eq(0)) {
      return "Cannot exchange 0.00";
    } else if (
      sourceBalance.lt(
        Big(value[0])
          .div(valueRate)
          .mul(sourceRate)
      )
    ) {
      return "Insufficient funds";
    }
    return null;
  }
);
