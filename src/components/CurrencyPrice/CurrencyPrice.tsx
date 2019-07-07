import React from "react";
import Big from "big.js";
import { RatesState } from "../../store/rates/reducer";
import { useSelector } from "react-redux";
import { ExchangeRates } from "../../store/rates/types";

interface CurrencyPriceProps {
  from: string;
  to: string;
}

const CurrencyPrice = ({ from, to }: CurrencyPriceProps) => {
  const rates = useSelector<{ rates: RatesState }, ExchangeRates>(state => state.rates.rates);

  const fromRate = rates[from];
  const toRate = rates[to];

  return (
    <>
      {Big(1)
        .div(fromRate)
        .mul(toRate)
        .toFixed(4)}
    </>
  );
};

export default CurrencyPrice;
