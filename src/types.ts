export interface ExchangeResponse {
    base: string;
    date: string;
    rates: {
      [key: string]: number;
    };
  };