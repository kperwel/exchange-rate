import React from "react";
import { act } from "@testing-library/react-hooks";
import usePull from "./usePull";
import { mount } from "enzyme";
import { HookWrapper, fetchMock } from "../utils/testHelpers";

jest.useFakeTimers();

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(fetchMock);
});

afterEach(() => {
  // @ts-ignore
  window.fetch.mockClear();
});

describe("<usePull />", () => {
  it("Should fetch on mount", () => {
    act(() => {
      mount(<HookWrapper hook={() => usePull("https://example.com", 1)} />);
    });
    jest.advanceTimersByTime(2);
    expect(window.fetch).toHaveBeenCalledTimes(3);
    expect(window.fetch).toHaveBeenLastCalledWith("https://example.com", undefined);
  });
});
