import React from "react";
import CurrencyAwareMoneyInput from "./containers/CurrencyAwareMoneyInput";
import CurrencySelector from "./containers/CurrencySelector";
import ExchangeButton from "./containers/ExchangeButton";
import styled from "styled-components";

import {
  getSourceCurrency,
  getTargetCurrency,
  getRatesFetchStatus,
  getSourceBalance,
  getTargetBalance
} from "./store/selectors";

import { useSelector } from "react-redux";
import { CURRENCY_TYPE } from "./store/user/reducer";
import { STATUS } from "./store/rates/reducer";

const AppStyled = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  width: 100%;
  min-height: 100%;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);

  justify-content: center;
  align-items: center;
`;

const App: React.FC = () => {
  const status = useSelector(getRatesFetchStatus);
  const sourceCurrency = useSelector(getSourceCurrency);
  const targetCurrency = useSelector(getTargetCurrency);

  const sourceBalance = useSelector(getSourceBalance);
  const targetBalance = useSelector(getTargetBalance);

  if (status === STATUS.ERROR) {
    return <>Error</>;
  } else if (status !== STATUS.FINISHED) {
    return <>Loading...</>;
  }

  return (
    <AppStyled>
      You have {sourceBalance} {sourceCurrency} and {targetBalance} {targetCurrency}. Pay
      <CurrencyAwareMoneyInput currencyType={CURRENCY_TYPE.SOURCE} />
      <CurrencySelector currencyType={CURRENCY_TYPE.SOURCE} />
      to receive
      <CurrencyAwareMoneyInput currencyType={CURRENCY_TYPE.TARGET} />
      <CurrencySelector currencyType={CURRENCY_TYPE.TARGET} />
      <ExchangeButton />
    </AppStyled>
  );
};

export default App;
