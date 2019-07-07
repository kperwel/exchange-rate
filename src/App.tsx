import React, { useState } from "react";
import "./App.css";

import CurrencyAwareMoneyInput from "./components/CurrencyAwareMoneyInput/CurrencyAwareMoneyInput";
import Slider from "./components/Slider/Slider";
import useCurrencies, { STATUS } from "./hooks/useCurrencies";
import { RateValue } from "./types";

// Second parameter for round method is a RoundingMode
// Sadly TS with isolated modules do not allow to use
// exported const enums from external module
const ROUNDING_UP = 3;
const ROUNDING_DOWN = 0;

const App: React.FC = () => {
  const { baseCurrency, supportedRates: rates, updateDate, status } = useCurrencies();
  const [value = ["0.00", baseCurrency] as RateValue, setValue] = useState<RateValue>();

  if (status !== STATUS.FINISHED) {
    return <>Loading...</>;
  }

  const lastEditedCurrency = value[1];

  return (
    <div className="exchange-rates">
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
      <Slider>
        <hr />
        {Object.keys(rates).map(currency => (
          <CurrencyAwareMoneyInput
            key={currency}
            from={rates[value[1]]}
            to={rates[currency]}
            currency={currency}
            isEditing={lastEditedCurrency === currency}
            onValueChange={setValue}
            rawValue={value[0]}
            roundingType={ROUNDING_DOWN}
          />
        ))}
      </Slider>
    </div>
  );
};

export default App;
