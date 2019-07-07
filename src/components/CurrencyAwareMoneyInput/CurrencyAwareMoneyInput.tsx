import React from "react";
import Big from "big.js";

import MoneyInput from "../MoneyInput/MoneyInput";
import { RateValue } from "../../types";

const exchangeToFixed2 = (value: string, from: number, to: number, roundingType: number) =>
  Big(value)
    .div(from)
    .mul(to)
    .round(2, roundingType)
    .toFixed(2);

interface CurrencyAwareMoneyInputProps {
  onValueChange: (value: RateValue) => void;
  rawValue: string;
  currency: string;
  isEditing: boolean;
  from: number;
  to: number;
  roundingType: number;
}

const CurrencyAwareMoneyInput = ({
  onValueChange,
  rawValue,
  currency,
  isEditing,
  roundingType,
  from,
  to
}: CurrencyAwareMoneyInputProps) => (
  <MoneyInput
    onValueChange={newValue => onValueChange([newValue, currency])}
    value={isEditing ? rawValue : exchangeToFixed2(rawValue, from, to, roundingType)}
  />
);

export default CurrencyAwareMoneyInput;
