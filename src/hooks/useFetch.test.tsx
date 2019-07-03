import React from "react";
import { mount } from "enzyme";
import useFetch from "./useFetch";

const TestComponent = () => {
  useFetch<string>("https://example.com");

  return null;
};

it("Should fetch http://example.com", async () => {
  jest.spyOn(window, "fetch");
  mount(<TestComponent />);
  expect(window.fetch).toBeCalledWith("https://example.com", undefined);
});
