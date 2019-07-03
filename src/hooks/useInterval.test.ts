import React from "react";
import { mount } from "enzyme";
import useFetch from "./useFetch";

const TestComponent = () => {
  useFetch<string>("https://example.com");

  return null;
};

it("Should be empty", async () => {
});
