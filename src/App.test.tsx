import React from 'react';
import { mount } from "enzyme";
import Big from "big.js";

import App from './App';
import { Status } from './store/rates/reducer';
import { provideStore } from './utils/testHelpers';

const getState = (status: Status) => ({
  "user": {
    "SOURCE": "EUR",
    "TARGET": "PLN",
    "value": [
      "0.00",
      "EUR"
    ],
    "balance": {
      "EUR": Big("1000"),
      "PLN": Big("200")
    }
  },
  "rates": {
    "rates": {
      "PLN": 4.2675,
      "EUR": 1
    },
    "date": "2019-07-10",
    "baseCurrency": "EUR",
    "error": null,
    "status": status
  }
});

it('should mount without crashing', () => {
  mount(provideStore(<App />, getState(Status.FINISHED)));
});

it('should render initial state', () => {
  const wrapper = mount(provideStore(<App />, getState(Status.FINISHED)));
  expect(wrapper).toMatchSnapshot();
});

it('should render loading state', () => {
  const wrapper = mount(provideStore(<App />, getState(Status.INIT)));
  expect(wrapper).toMatchSnapshot();
});

it('should render error state', () => {
  const wrapper = mount(provideStore(<App />, getState(Status.ERROR)));
  expect(wrapper).toMatchSnapshot();
});

