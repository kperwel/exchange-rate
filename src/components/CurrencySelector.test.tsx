import React from "react";
import CurrencySelector from "./CurrencySelector";
import { mount } from "enzyme";
import { Currency } from "../types";

describe("<CurrencySelector />", () => {
  it("renders select", () => {
    const wrapper = mount(
      <CurrencySelector currency="PLN" onChange={() => {}} currencies={["PLN"]} />
    );
    expect(wrapper.find("select")).toHaveLength(1);
  });

  it("should be clickable", () => {
    const handler = jest.fn(() => {});

    const wrapper = mount(
      <CurrencySelector onChange={handler} currencies={["PLN", "EUR"]} currency={"PLN"} />
    );
    wrapper.find("select").simulate("change", { target: { value: "EUR" } });

    expect(handler).toHaveBeenCalledWith("EUR");
  });
});
