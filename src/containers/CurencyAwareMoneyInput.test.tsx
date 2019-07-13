import React from "react";
import { mount } from "enzyme";
import Big from "big.js";

import CurrencyAwareMoneyInput from "./CurrencyAwareMoneyInput";
import { provideStore } from "../utils/testHelpers";
import { CurrencyType } from "../store/user/reducer";

const getState = ({
  sourceCurrency = "PLN",
  sourceCurrencyRate = 1,
  targetCurrencyRate = 1,
  targetCurrency = "EUR",
  value = "1.99",
  valueCurrency = sourceCurrency
} = {}) => ({
  user: {
    SOURCE: sourceCurrency,
    TARGET: targetCurrency,
    value: [value, valueCurrency]
  },
  rates: {
    rates: {
      [sourceCurrency]: sourceCurrencyRate,
      [targetCurrency]: targetCurrencyRate,
      "EMPTY": "1",
    }
  }
});
describe("<CurrencySelector />", () => {
  it("Should format only currently not edited input", () => {
    const state = getState({ sourceCurrency: "EUR", targetCurrency: "PLN", value: "1.9", sourceCurrencyRate: 1, targetCurrencyRate: 1 });
    const sourceInput = mount(
      provideStore(<CurrencyAwareMoneyInput currencyType={CurrencyType.SOURCE} />, state)
    );
    const targetInput = mount(
      provideStore(<CurrencyAwareMoneyInput currencyType={CurrencyType.TARGET} />, state)
    );

    expect(
      sourceInput
        .find("input")
        .at(0)
        .props().value
    ).toBe("1.9");
    expect(
      targetInput
        .find("input")
        .at(0)
        .props().value
    ).toBe("1.90");
  });

  it("Should round source input up and target input down", () => {
    const state = getState({ sourceCurrency: "EUR", targetCurrency: "PLN", value: "1.999", valueCurrency: "EMPTY", sourceCurrencyRate: 1, targetCurrencyRate: 1 });
    const sourceInput = mount(
      provideStore(<CurrencyAwareMoneyInput currencyType={CurrencyType.SOURCE} />, state)
    );
    const targetInput = mount(
      provideStore(<CurrencyAwareMoneyInput currencyType={CurrencyType.TARGET} />, state)
    );

    expect(
        sourceInput
          .find("input")
          .at(0)
          .props().value
      ).toBe("2.00");
      expect(
        targetInput
          .find("input")
          .at(0)
          .props().value
      ).toBe("1.99");
  });
});
