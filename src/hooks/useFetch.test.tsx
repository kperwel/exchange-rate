import React from "react";
import useFetch from "./useFetch";
import { act } from "@testing-library/react-hooks";
import { mount } from "enzyme";

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
  jest.spyOn(window, "fetch").mockImplementation(() => new Promise(resolve => resolve())); // 4
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
