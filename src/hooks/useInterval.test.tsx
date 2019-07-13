import React from "react";
import useInterval from "./useInterval";
import { act } from "@testing-library/react-hooks";
import { mount } from "enzyme";
import { HookWrapper } from "../utils/testHelpers";

jest.useFakeTimers();

describe("<useFetch />", () => {
  it("Should fetch on mount", () => {
    const handler = jest.fn();
    act(() => {
      mount(<HookWrapper hook={() => useInterval(handler, 1)} />);
    });
    jest.advanceTimersByTime(2);
    expect(handler).toHaveBeenCalledTimes(2);
  });
});
