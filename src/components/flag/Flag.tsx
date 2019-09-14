import React, { ReactNode } from "react";

import flags from "./assets";

const Flag = ({
  currency,
  customRenderProvider
}: {
  currency: string;
  customRenderProvider?: (flagSrc: string, currency: string) => JSX.Element;
}) => {
  if (customRenderProvider) {
    return customRenderProvider(flags[currency.toLowerCase()], currency.toLowerCase());
  }
  return (
    <img src={flags[currency.toLowerCase()]} title={`Flag for ${currency}`} alt={`${currency}`} />
  );
};

export default Flag;
