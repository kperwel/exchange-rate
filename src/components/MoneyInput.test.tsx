import React from "react";
import MoneyInput, { sanitizeInput, passValidation } from "./MoneyInput";
import { shallow, mount } from "enzyme";

describe("<MoneyInput />", () => {
  it("renders MoneyInput", () => {
    // Input value is not sanitized and formatted 
    // to not break natural input feeling
    shallow(<MoneyInput value={"0.00"} onValueChange={() => {}} />);
  });

  it("should not format input value", () => {
    const wrapper = mount(<MoneyInput value="test" onValueChange={() => {}} />);

    expect(wrapper.find("input").at(0).props().value).toBe("test");
  });

  it("Should not pass wrong value other than empty", () => {
    const handler = jest.fn(() => {});
    const wrapper = mount(<MoneyInput value="test" onValueChange={handler} />);
    wrapper.find("input").simulate("change", { target: { value: "wrong" } });

    expect(handler).toHaveBeenCalledWith("")
  });

  it("Should pass correct values empty", () => {
    const handler = jest.fn(() => {});
    const wrapper = mount(<MoneyInput value="test" onValueChange={handler} />);

    wrapper.find("input").simulate("change", { target: { value: "0.01" } });

    expect(handler).toHaveBeenCalledWith("0.01")
  });
});


describe("<MoneyInput /> -> sanitization", () => {
  it("Should remove special chars from input", () => {
    expect(sanitizeInput("0.0f")).toBe("0.0");
    expect(sanitizeInput("asd_a$#$sd0asd.asd0as()dasd")).toBe("0.0");
  });

  it("Should replace comma with dot", () => {
    expect(sanitizeInput("0,0")).toBe("0.0");
  });
});

describe("<MoneyInput /> -> validation", () => {
  it("Should not accept incorrect numbers", () => {
    expect(passValidation("0..")).toBeFalsy();
    expect(passValidation(".")).toBeFalsy();
  });

  it("Should accept not completly written number", () => {
    expect(passValidation("")).toBeTruthy();
    expect(passValidation("0.")).toBeTruthy();
    expect(passValidation("0.0")).toBeTruthy();
  });
});
