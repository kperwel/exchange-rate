import React from "react";
import styled from "styled-components";

import {
  TargetCurrencyPrice,
  SwapButton,
  ExchangeButton,
  CurrencyAwareMoneyInput,
  CurrencySelector,
  Header
} from "./containers";
import { Loader, Flag } from "./components";

import { MainLayout } from "./layout";

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

const BalanceStyled = styled.span`
  font-weight: bold;
  width: 30%;
`;

const BalanceMessageStyled = styled.p`
  color: #fff;
`;

const ButtonsSectionStyled = styled.div`
  display: flex;
  align-content: flex-end;
  flex-direction: column;
  position: relative;
  line-height: 1em;
`;

const InputSection = styled.div`
  align-items: center;
  background: #fff;
  box-shadow: 0px 2px 7px 0px #002c9080;
  padding: 10px;
  display: flex;
  padding-right: 40px;
`;

const FlagStyled = styled.img`
  height: 1em;
  margin: 5px;
`;

const TargetCurrencyContainer = styled.div`
  position: absolute;
  left: 50%;
  font-size: 0.8em;
  transform: translate(-50%, -50%);
  padding: 2px 4px;
  border: 1px solid #e6ebf5;
  background: #fff;
`;

const customFlagProvider = (src: string, currency: string) => (
  <FlagStyled src={src} title={`Flag for ${currency}`} alt={`${currency}`} />
);

const App: React.FC = () => {
  const status = useSelector(getRatesFetchStatus, shallowEqual);
  const sourceCurrency = useSelector(getSourceCurrency, shallowEqual);
  const targetCurrency = useSelector(getTargetCurrency, shallowEqual);

  const sourceBalance = useSelector(getSourceBalance, shallowEqual);
  const targetBalance = useSelector(getTargetBalance, shallowEqual);

  if (status === Status.ERROR) {
    return <>Error</>;
  } else if (status !== Status.FINISHED) {
    return <Loader />;
  }

  return (
    <MainLayout headerProvider={() => <Header balance={sourceBalance} currency={sourceCurrency} />}>
      <BalanceMessageStyled>
        Your balance is <BalanceStyled>{sourceBalance.toFixed(2)}</BalanceStyled> {sourceCurrency} and <BalanceStyled>{targetBalance.toFixed(2)}</BalanceStyled> {targetCurrency} .
      </BalanceMessageStyled>
      <div>
        <InputSection>
          <Flag customRenderProvider={customFlagProvider} currency={sourceCurrency} />
          <CurrencyAwareMoneyInput currencyType={CurrencyType.SOURCE} />
          <CurrencySelector currencyType={CurrencyType.SOURCE} />
        </InputSection>
        <ButtonsSectionStyled>
          <TargetCurrencyContainer>
            1 {sourceCurrency} = <TargetCurrencyPrice />{targetCurrency}
          </TargetCurrencyContainer>
          <SwapButton />
        </ButtonsSectionStyled>
        <InputSection>
          <Flag customRenderProvider={customFlagProvider} currency={targetCurrency} />
          <CurrencyAwareMoneyInput currencyType={CurrencyType.TARGET} />
          <CurrencySelector currencyType={CurrencyType.TARGET} />
        </InputSection>
        <ButtonsSectionStyled>
          <ExchangeButton />
        </ButtonsSectionStyled>
      </div>
    </MainLayout>
  );
};

export default App;
