import React from "react";
import Big from "big.js";
import { useSelector, useDispatch } from "react-redux";

import { valueChange } from "../store/user/actions";

import MoneyInput from "../components/MoneyInput";
import { Currency } from "../types";
import { ExchangeRates } from "../store/rates/types";
import { RatesState } from "../store/rates/reducer";
import { UserState, CURRENCY_TYPE } from "../store/user/reducer";

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
  currencyType: CURRENCY_TYPE;
}

// Second parameter for round method is a RoundingMode
// Sadly TS with isolated modules do not allow to use
// exported const enums from external module
const ROUNDING_UP = 3;
const ROUNDING_DOWN = 0;

const CurrencyAwareMoneyInput = ({ currencyType }: CurrencyAwareMoneyInputProps) => {
  const rates = useSelector<{ rates: RatesState }, ExchangeRates>(state => state.rates.rates);
  const currency = useSelector<{ user: UserState }, Currency>(state => state.user[currencyType]);
  const [rawValue, from] = useSelector<{ user: UserState }, [string, string]>(
    state => state.user.value
  );

  const dispatch = useDispatch();
  const roundingType = currencyType === CURRENCY_TYPE.SOURCE ? ROUNDING_UP : ROUNDING_DOWN;
  const isEditing = from === currency;
  const fromRate = rates[from];
  const toRate = rates[currency];

  const onChange = (newValue: string) => dispatch(valueChange([newValue, currency]));

  return (
    <MoneyInput
      onValueChange={onChange}
      value={
        isEditing ? rawValue : exchangeToFixed2(rawValue || "0.00", fromRate, toRate, roundingType)
      }
    />
  );
};

export default CurrencyAwareMoneyInput;
