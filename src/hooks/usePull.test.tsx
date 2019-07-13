import React from "react";
import { act } from "@testing-library/react-hooks";
import usePull from "./usePull";
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

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(
    () =>
      new Promise(resolve =>
        resolve(({
          ok: true,
          status: 200,
          json: () => {
            return {};
          }
        } as any) as Response)
      )
  );
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
