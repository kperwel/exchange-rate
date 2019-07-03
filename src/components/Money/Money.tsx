import React from "react";
import { Big } from "big.js";

interface MoneyPropsType {
  value: Big;
  fixed?: number;
}

const Money = ({ value, fixed = 2 }: MoneyPropsType) => <>{value.toFixed(fixed)}</>;

export default Money;
