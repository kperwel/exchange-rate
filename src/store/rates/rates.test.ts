import * as actions from "./actions";
import userReducer, { Status } from "./reducer";

const getState = () => ({
  rates: {
    PLN: 4.2675,
    EUR: 1
  },
  date: "2019-07-10",
  baseCurrency: "EUR",
  error: null,
  status: Status.INIT
});

const response = {
  base: "PLN",
  date: "2019-07-10",
  rates: {
      EUR: 0.3
  }
};

describe("<Rates />", () => {
  it("should render finished state", () => {
    const reduced = userReducer(getState(), actions.fetchRatesFinished(response));
    expect(reduced).toMatchSnapshot();
  });

  it("should render error state", () => {
    const reduced = userReducer(getState(), actions.fetchRatesError(Error("test error")));
    expect(reduced).toMatchSnapshot();
  });
});
