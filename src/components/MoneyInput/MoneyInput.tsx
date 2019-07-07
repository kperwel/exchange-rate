import React, { ChangeEvent } from "react";
import styled from "styled-components";
const WrapperStyled = styled.div`
  display: flex;
`;

const InputStyled = styled.input`
  color: #8ec5fc;
  font-size: 2em;
  font-weight: bold;
  background: none;
  border: 0;
  outline: 0;
`;

const sanitizeInput = (input: string = "") => {
  return input.replace(/\,/, ".").replace(/[^\d\,\.]/g, '');
}

const passValidation = (input: string = "") => {
  const splitted = input.split(".") || [];
  console.log(splitted);
  if (splitted.length > 2) {
    return false;
  }

  if (splitted[1] && splitted[1].length > 2) {
    return false;
  }

  return true;
}

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
  }

  return (
    <WrapperStyled>
      <InputStyled inputMode="numeric" type="text" value={value} onChange={onChange} />
    </WrapperStyled>
  );
};

export default MoneyInput;
