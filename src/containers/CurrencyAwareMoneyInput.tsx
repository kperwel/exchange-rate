import React from "react";
import Big from "big.js";
import { useSelector, useDispatch } from "react-redux";

import { valueChange } from "../store/user/actions";
import { MoneyInput } from "../components";
import { CurrencyType } from "../store/user/reducer";
import { getExchangeRates, getValue, getSourceCurrency, getTargetCurrency } from "../store/selectors";

export enum InputType {
  SOURCE,
  TARGET
}

const exchangeToFixed2 = (value: string, from: number, to: number, roundingType: number) =>
  Big(value)
    .div(from)
    .mul(to)
    .round(2, roundingType)
    .toFixed(2);

interface CurrencyAwareMoneyInputProps {
  currencyType: CurrencyType;
}

// Second parameter for round method is a RoundingMode
// Sadly TS with isolated modules do not allow to use
// exported const enums from external module
const ROUNDING_UP = 3;
const ROUNDING_DOWN = 0;

const CurrencyAwareMoneyInput = ({ currencyType }: CurrencyAwareMoneyInputProps) => {
  const rates = useSelector(getExchangeRates);
  const [rawValue, valueCurrency] = useSelector(getValue);
  const currency = useSelector(currencyType === CurrencyType.SOURCE ? getSourceCurrency : getTargetCurrency);

  const dispatch = useDispatch();

  const roundingType = currencyType === CurrencyType.SOURCE ? ROUNDING_UP : ROUNDING_DOWN;
  const isCurrentlyEditing = valueCurrency === currency;
  const fromRate = rates[valueCurrency];
  const toRate = rates[currency];

  const onChange = (newValue: string) => dispatch(valueChange([newValue, currency]));

  return (
    <MoneyInput
      onValueChange={onChange}
      value={
        isCurrentlyEditing ? rawValue : exchangeToFixed2(rawValue || "0.00", fromRate, toRate, roundingType)
      }
    />
  );
};

export default CurrencyAwareMoneyInput;
