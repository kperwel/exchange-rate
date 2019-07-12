import React from "react";
import CurrencyAwareMoneyInput from "./containers/CurrencyAwareMoneyInput";
import CurrencySelector from "./containers/CurrencySelector";
import ExchangeButton from "./containers/ExchangeButton";
import SwapButton from "./containers/SwapButton";
import TargetCurrencyPrice from "./containers/TargetCurrencyPrice";
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
  font-size: 2em;
  width: 100%;
  min-height: 100%;

  align-items: center;
  justify-content: center;
  text-align: center;
  color: #47404e;
  line-height: 1.7em;
`;

const BalanceStyled = styled.span`
  font-weight: bold;
`;

const RatioDescriptionStyled = styled.span`
  font-style: italic;
  display: block;
  margin-top: 0.5em;
  font-size: 0.7em;
  line-height: 1.3em;
`;

const TransactionDescriptionStyled = styled.div`
  max-width: 1200px;
`;

const ButtonsSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  line-height: 1em;
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
      <TransactionDescriptionStyled>
        You have <BalanceStyled>{sourceBalance.toFixed(2)}</BalanceStyled> {sourceCurrency} and{" "}
        <BalanceStyled>{targetBalance.toFixed(2)}</BalanceStyled> {targetCurrency}.
        <br />
        Pay <CurrencyAwareMoneyInput currencyType={CURRENCY_TYPE.SOURCE} />
        <CurrencySelector currencyType={CURRENCY_TYPE.SOURCE} />
        to get
        <CurrencyAwareMoneyInput currencyType={CURRENCY_TYPE.TARGET} />
        <CurrencySelector currencyType={CURRENCY_TYPE.TARGET} />
        <RatioDescriptionStyled>
          You will get <TargetCurrencyPrice /> {targetCurrency} for each {sourceCurrency}
        </RatioDescriptionStyled>
        <ButtonsSectionStyled>
        <ExchangeButton /> or <SwapButton /> 
        </ButtonsSectionStyled>
      </TransactionDescriptionStyled>
    </AppStyled>
  );
};

export default App;
