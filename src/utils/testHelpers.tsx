import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

export const provideStore = (
  children: React.ReactNode,
  mockedState: any,
  reducer = (state = mockedState) => state
) => <Provider store={createStore(reducer)}>{children}</Provider>;

export function HookWrapper(props: { hook: () => void }) {
  if (props.hook) {
    props.hook();
  }
  return <div />;
}

export const fetchMock = () =>
  new Promise<Response>(resolve =>
    resolve(({
      ok: true,
      status: 200,
      json: () => {
        return {};
      }
    } as any) as Response)
  );
