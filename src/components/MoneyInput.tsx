import React, { ChangeEvent } from "react";
import styled from "styled-components";

const InputStyled = styled.input`
  font-size: inherit;
  color: inherit;
  background: #FFFFFF33;
  border: 0;
  max-width: 200px;
  margin-left: 5px;
  margin-right: 5px;
`;

export const sanitizeInput = (input: string = "") => {
  return input.replace(/,/, ".").replace(/[^\d,.]/g, "");
};

export const passValidation = (input: string = "") => {
  const splitted = input.split(".") || [];

  if (splitted.length > 2) {
    return false;
  }

  if (splitted[1] && splitted[1].length > 2) {
    return false;
  }

  if (splitted.length > 1 && splitted[0].length === 0 && splitted[1].length === 0) {
    return false;
  }

  return true;
};

interface MoneyInputProps {
  onValueChange: (value: string) => void;
  value: string;
}

const MoneyInput = ({ value, onValueChange }: MoneyInputProps) => {
  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const sanitizedInput = sanitizeInput(ev.target.value);
    if (passValidation(sanitizedInput)) {
      onValueChange(sanitizedInput);
    }
  };

  return <InputStyled inputMode="numeric" type="text" value={value} onChange={onChange} />;
};

export default MoneyInput;
