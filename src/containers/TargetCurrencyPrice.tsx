import React from "react";
import Big from "big.js";
import { useSelector } from "react-redux";
import {
  getTargetRate,
  getSourceRate,
} from "../store/selectors";

interface CurrencyPriceProps {
  from: string;
  to: string;
}

const TargetCurrencyPrice = () => {
  const fromRate = useSelector(getSourceRate);
  const toRate = useSelector(getTargetRate);

  return (
    <>
      {Big(1)
        .div(fromRate)
        .mul(toRate)
        .toFixed(4)}{" "}
    </>
  );
};

export default TargetCurrencyPrice;
