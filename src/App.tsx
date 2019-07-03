import React from "react";
import "./App.css";

import { EXCHANGE_URL } from "./settings";
import { ExchangeResponse } from "./types";

import usePull from "./hooks/usePull";

const App: React.FC = () => {
  const rates = usePull<ExchangeResponse>(EXCHANGE_URL);

  if (!rates) {
    return <>Loading...</>;
  }

  return <div className="exchange-rates" />;
};

export default App;
