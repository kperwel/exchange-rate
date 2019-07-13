import { Currency } from "../../types";

export interface Transation {
  value: [string, string];
  valueRate: number;
  sourceRate: number;
  sourceCurrency: string;
  targetRate: number;
  targetCurrency: string;
}

export const createTransaction = (
  value: [string, Currency],
  valueRate: number,
  sourceRate: number,
  sourceCurrency: string,
  targetRate: number,
  targetCurrency: string
): Transation => ({
  value,
  valueRate,
  sourceRate,
  sourceCurrency,
  targetRate,
  targetCurrency
});
