import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

export const provideStore = (
  children: React.ReactNode,
  mockedState: any,
  reducer = (state = mockedState) => state
) => <Provider store={createStore(reducer)}>{children}</Provider>;
