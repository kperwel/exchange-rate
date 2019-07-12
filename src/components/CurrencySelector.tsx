import React from "react";
import { Currency } from "../types";
import styled from "styled-components";

const SelectStyled = styled.select`
  font-size: inherit;
  color: inherit;
  background: #FFFFFF33;
  border: 0;
  margin-left: 5px;
  margin-right: 5px;
`;

interface CurrencySelectorProps {
  currency: Currency;
  currencies: Currency[];
  onChange: (value: Currency) => void;
}

const CurrencySelector = ({ currency, currencies, onChange }: CurrencySelectorProps) => (
  <SelectStyled value={currency} onChange={ev => onChange(ev.target.value)}>
    {currencies.map((_currency: Currency) => (
      <option key={_currency} value={_currency}>
        {_currency}
      </option>
    ))}
  </SelectStyled>
);

export default CurrencySelector;
