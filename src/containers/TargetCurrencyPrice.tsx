import React from "react";
import Big from "big.js";
import { useSelector, shallowEqual } from "react-redux";
import {
  getTargetRate,
  getSourceRate,
} from "../store/selectors";

const TargetCurrencyPrice = () => {
  const fromRate = useSelector(getSourceRate, shallowEqual);
  const toRate = useSelector(getTargetRate, shallowEqual);

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
