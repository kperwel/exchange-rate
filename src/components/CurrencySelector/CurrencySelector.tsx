import React from "react";
import { Currency } from "../../types";

interface CurrencySelectorProps {
  currency: Currency;
  currencies: Currency[];
  onChange: (value: Currency) => void;
}

const CurrencySelector = ({ currency, currencies, onChange }: CurrencySelectorProps) => (
  <select value={currency} onChange={ev => onChange(ev.target.value)}>
    {currencies.map((_currency: Currency) => (
      <option key={_currency} value={_currency}>
        {_currency}
      </option>
    ))}
  </select>
);

export default CurrencySelector;
