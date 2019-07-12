import React from "react";
import Button from "../components/Button";
import { currencyChange } from "../store/user/actions";
import { useDispatch } from "react-redux";
import { CURRENCY_TYPE } from "../store/user/reducer";
import { Currency } from "../types";

interface PropTypes {
  currency: Currency,
  currencyType: CURRENCY_TYPE;
}

const CurrencySelectButton = ({ currencyType, currency }: PropTypes) => {
  const dispatch = useDispatch();
  return <Button onClick={() => dispatch(currencyChange(currency, currencyType))}>{currency}</Button>;
};

export default CurrencySelectButton;
