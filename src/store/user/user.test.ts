import * as actions from "./actions";
import userReducer, { CurrencyType } from "./reducer";
import Big from "big.js";

const getState = () => ({
  [CurrencyType.SOURCE]: "EUR",
  [CurrencyType.TARGET]: "PLN",
  value: ["0.00", "EUR"] as [string, string],
  balance: {
    EUR: Big("1000.00"),
    PLN: Big("200.00")
  }
});

describe("<Rates />", () => {
  it("should change currency", () => {
    const reducedSource = userReducer(
      getState(),
      actions.currencyChange("PLN", CurrencyType.SOURCE)
    );
    expect(reducedSource[CurrencyType.SOURCE]).toBe("PLN");
    const reducedTarget = userReducer(
      getState(),
      actions.currencyChange("USD", CurrencyType.TARGET)
    );
    expect(reducedTarget[CurrencyType.TARGET]).toBe("USD");
  });

  it("Should swap currencies", () => {
    const source = getState();
    const reduced = userReducer(source, actions.swap());
    expect(reduced[CurrencyType.SOURCE]).toBe(source[CurrencyType.TARGET]);
    expect(reduced[CurrencyType.TARGET]).toBe(source[CurrencyType.SOURCE]);
  });

  it("Should swap currencies", () => {
    const source = getState();
    const reduced = userReducer(source, actions.valueChange(["0.10", "EUR"]));
    expect(reduced.value[0]).toBe("0.10");
    expect(reduced.value[1]).toBe("EUR");
  });

  it("Should do transaction", () => {
    const source = getState();
    const reduced = userReducer(source, actions.exchange({
        value: ["1", "EUR"],
        valueRate: 1,
        sourceCurrency: "EUR",
        sourceRate: 1,
        targetCurrency: "PLN",
        targetRate: 3
    }));

    expect(reduced.balance["PLN"].eq("203")).toBeTruthy();
    expect(reduced.balance["EUR"].eq("999")).toBeTruthy();
  });

  it("Not enough balance", () => {
    const source = getState();
    const reduced = userReducer(source, actions.exchange({
        value: ["10000", "EUR"],
        valueRate: 1,
        sourceCurrency: "EUR",
        sourceRate: 1,
        targetCurrency: "PLN",
        targetRate: 3
    }));

    expect(reduced.balance["PLN"].eq("200")).toBeTruthy();
    expect(reduced.balance["EUR"].eq("1000")).toBeTruthy();
  });
});
