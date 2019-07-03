import React from "react";
import { shallow, mount } from "enzyme";
import Money from "./Money";
import Big from "big.js";

it("should mount without crashing", () => {
  mount(<Money value={Big(0)} />);
});

it("should display money in fixed 2", () => {
  const wrapper = shallow(<Money value={Big(0)} />);
  expect(wrapper.text()).toBe("0.00");
});
