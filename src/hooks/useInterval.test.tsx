import React from "react";
import useInterval from "./useInterval";
import { act } from "@testing-library/react-hooks";
import { mount } from "enzyme";

jest.useFakeTimers();

function HookWrapper(props) {
    act(() => {
      if (props.hook) {
        props.hook();
      }
    });
    // @ts-ignore
    return <div />;
  }

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
