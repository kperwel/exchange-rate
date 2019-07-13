import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { getCurrencies, getSourceCurrency, getTargetCurrency } from "../store/selectors";
import { CurrencySelector as CurrencySelectorView } from "../components";
import { CurrencyType } from "../store/user/reducer";

import { currencyChange } from "../store/user/actions";
import { Currency } from "../types";

interface CurrencySelectorProps {
  currencyType: CurrencyType;
}

const CurrencySelector = ({ currencyType }: CurrencySelectorProps) => {
  const currencies = useSelector(getCurrencies, shallowEqual);
  const currency = useSelector(
    currencyType === CurrencyType.TARGET ? getTargetCurrency : getSourceCurrency,
    shallowEqual
  );

  const dispatch = useDispatch();
  const onChange = (value: Currency) => dispatch(currencyChange(value, currencyType));

  return <CurrencySelectorView onChange={onChange} currency={currency} currencies={currencies} />;
};

export default CurrencySelector;
