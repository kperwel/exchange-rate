import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCurrencies, getSourceCurrency, getTargetCurrency } from "../store/selectors";
import { CurrencySelector as CurrencySelectorView } from "../components";
import { CurrencyType } from "../store/user/reducer";

import { currencyChange } from "../store/user/actions";
import { Currency } from "../types";

interface CurrencySelectorProps {
  currencyType: CurrencyType;
}

const CurrencySelector = ({ currencyType }: CurrencySelectorProps) => {
  const currencies = useSelector(getCurrencies);
  const currency = useSelector(
    currencyType === CurrencyType.TARGET ? getTargetCurrency : getSourceCurrency
  );

  const dispatch = useDispatch();
  const onChange = (value: Currency) => dispatch(currencyChange(value, currencyType));

  return <CurrencySelectorView onChange={onChange} currency={currency} currencies={currencies} />;
};

export default CurrencySelector;
