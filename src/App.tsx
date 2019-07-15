import React from "react";
import styled from "styled-components";

import {
  TargetCurrencyPrice,
  SwapButton,
  ExchangeButton,
  CurrencyAwareMoneyInput,
  CurrencySelector
} from "./containers";
import { Loader } from "./components";

import {
  getSourceCurrency,
  getTargetCurrency,
  getRatesFetchStatus,
  getSourceBalance,
  getTargetBalance
} from "./store/selectors";

import { useSelector, shallowEqual } from "react-redux";
import { CurrencyType } from "./store/user/reducer";
import { Status } from "./store/rates/reducer";

const AppStyled = styled.form`
  display: flex;
  font-size: 2em;
  width: 100%;
  min-height: 100%;
  padding: 5px;

  align-items: center;
  justify-content: center;
  text-align: center;
  color: #47404e;
  line-height: 1.7em;
  
  @media (max-width: 768px) {
  font-size: 1.5em;
  }
`;

const BalanceStyled = styled.span`
  font-weight: bold;
`;

const InlineInputs = styled.span`
  white-space: nowrap;
`;

const RatioDescriptionStyled = styled.span`
  font-style: italic;
  display: block;
  margin-top: 0.5em;
  font-size: 0.7em;
  line-height: 1.3em;
`;

const TransactionDescriptionStyled = styled.div`
  max-width: 800px;
`;

const ButtonsSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  line-height: 1em;
`;

const App: React.FC = () => {
  const status = useSelector(getRatesFetchStatus, shallowEqual);
  const sourceCurrency = useSelector(getSourceCurrency, shallowEqual);
  const targetCurrency = useSelector(getTargetCurrency, shallowEqual);

  const sourceBalance = useSelector(getSourceBalance, shallowEqual);
  const targetBalance = useSelector(getTargetBalance, shallowEqual);

  const preventSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
  }

  if (status === Status.ERROR) {
    return <>Error</>;
  } else if (status !== Status.FINISHED) {
    return <Loader />;
  }

  return (
    <AppStyled onSubmit={preventSubmit}>
      <TransactionDescriptionStyled>
        You have{" "}
        <InlineInputs>
          <BalanceStyled>{sourceBalance.toFixed(2)}</BalanceStyled> {sourceCurrency}
        </InlineInputs>
        {" "}and{" "}
        <InlineInputs>
          <BalanceStyled>{targetBalance.toFixed(2)}</BalanceStyled> {targetCurrency}.
        </InlineInputs>
        <br/>Pay 
        <InlineInputs><CurrencyAwareMoneyInput currencyType={CurrencyType.SOURCE} />
          <CurrencySelector currencyType={CurrencyType.SOURCE} />
        </InlineInputs>
          to get
        <InlineInputs>
          <CurrencyAwareMoneyInput currencyType={CurrencyType.TARGET} />
          <CurrencySelector currencyType={CurrencyType.TARGET} />
        </InlineInputs>
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
