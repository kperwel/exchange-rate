import React, { ChangeEvent } from "react";
import styled from "styled-components";

const WrapperStyled = styled.div`
  display: flex;
  background: #fff;
  border: 1px dotted #666;
`;

const InputStyled = styled.input`
  color: #000;
  font-size: 5em;
  font-weight: bold;
  background: none;
  border: 0;
  outline: 0;
`;

interface MoneyInputProps {
  onValueChange: (value: string) => void;
  value: string;
}

const MoneyInput = ({ value, onValueChange }: MoneyInputProps) => {
  const onChange = (ev: ChangeEvent<HTMLInputElement>) => onValueChange(ev.target.value);

  return (
    <WrapperStyled>
      <InputStyled inputMode="numeric" type="text" value={value} onChange={onChange} />
    </WrapperStyled>
  );
};

export default MoneyInput;
