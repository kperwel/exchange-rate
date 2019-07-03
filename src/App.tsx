import React from 'react';
import './App.css';

import useExchangeRates from "./hooks/useExchangeRates";

const App: React.FC = () => {
  const rates = useExchangeRates();
  return (
    <div className="App">
      {JSON.stringify(rates)}
    </div>
  );
}

export default App;
