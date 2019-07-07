import React, { useState } from "react";
import CurrencyAwareMoneyInput from "../components/CurrencyAwareMoneyInput/CurrencyAwareMoneyInput";
import Button from "../components/Button/Button";
import Slider from "../components/Slider/Slider";
import useCurrencies, { STATUS } from "../hooks/useCurrencies";
import { RateValue } from "../types";
import styled from "styled-components";

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

const InputSectionStyled = styled.div`
  background: #fff;
  max-width: 100%;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  padding: 10px;
  margin: 5px;
`;

const MenuSectionStyled = styled.div`
  background: #fff;
  max-width: 100%;
  display: flex;
  justify-items: space-between;
  flex-direction: row;
`;

const CurrencySelectSection = styled.div`
  background: rgba(255, 255, 255, 0.2);
`;

// Second parameter for round method is a RoundingMode
// Sadly TS with isolated modules do not allow to use
// exported const enums from external module
const ROUNDING_UP = 3;
const ROUNDING_DOWN = 0;

const App: React.FC = () => {
  const { baseCurrency, supportedRates: rates, updateDate, status } = useCurrencies();
  const [value = ["0.00", baseCurrency] as RateValue, setValue] = useState<RateValue>();

  const [targetCurrency = baseCurrency, setTargetCurrency] = useState<string>();

  if (status !== STATUS.FINISHED) {
    return <>Loading...</>;
  }

  const lastEditedCurrency = value[1];

  return (
    <AppStyled>
      <MenuSectionStyled>
        <Button onClick={() => console.log("cancel")} text="Cancel" />
        <Button onClick={() => console.log("exchange")} text="Exchange" />
      </MenuSectionStyled>
      <InputSectionStyled>
        {baseCurrency}
        <CurrencyAwareMoneyInput
          key={baseCurrency}
          currency={baseCurrency}
          from={rates[value[1]]}
          to={rates[baseCurrency]}
          isEditing={lastEditedCurrency === baseCurrency}
          onValueChange={setValue}
          rawValue={value[0]}
          roundingType={ROUNDING_UP}
        />
        {targetCurrency}
        <CurrencyAwareMoneyInput
          key={targetCurrency + "target"}
          from={rates[value[1]]}
          to={rates[targetCurrency]}
          currency={targetCurrency}
          isEditing={lastEditedCurrency === targetCurrency}
          onValueChange={setValue}
          rawValue={value[0]}
          roundingType={ROUNDING_DOWN}
        />
        
      </InputSectionStyled>
      <CurrencySelectSection>
        {Object.keys(rates).map(currency => <Button key={currency} onClick={() => setTargetCurrency(currency)} text={currency} />)}
      </CurrencySelectSection>
    </AppStyled>
  );
};

export default App;
