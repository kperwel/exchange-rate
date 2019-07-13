import React from "react";
import useFetch from "./useFetch";
import { act } from "@testing-library/react-hooks";
import { mount } from "enzyme";
import { HookWrapper, fetchMock } from "../utils/testHelpers";

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(fetchMock);
});

afterEach(() => {
  // @ts-ignore
  window.fetch.mockClear();
});

describe("<useFetch />", () => {
  it("Should fetch on mount", () => {
    act(() => {
      mount(<HookWrapper hook={() => useFetch("https://example.com")} />);
    });
    expect(window.fetch).toHaveBeenCalledWith("https://example.com", undefined);
  });
});
