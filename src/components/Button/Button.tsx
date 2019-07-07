import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  display: inline-block;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #eee;
  padding: 10px 20px;
  color: #666;
  margin: 3px;
`;

interface Props {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: Props) => <ButtonStyled onClick={onClick}>{text}</ButtonStyled>;

export default Button;
