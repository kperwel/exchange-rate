import React from "react";
import Loader from "./Loader";
import { mount } from "enzyme";

describe("<Loader />", () => {
  it("renders Loader with icon", () => {
    const wrapper = mount(<Loader />);
    expect(wrapper.find("svg")).toHaveLength(1);
  });
});
