import React from "react";
import Button from "./Button";
import { mount } from "enzyme";

describe("<Button />", () => {
  it("renders button", () => {
    const wrapper = mount(<Button onClick={() => {}} />);
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("should be clickable", () => {
    const handler = jest.fn(() => {});
    const wrapper = mount(<Button onClick={handler} />);

    wrapper.simulate("click");
    expect(handler).toHaveBeenCalled();
  });
});
