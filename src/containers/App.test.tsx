import React from 'react';
import { mount } from "enzyme";
import App from '../App';

it('should mount without crashing', () => {
  mount(<App />);
});

