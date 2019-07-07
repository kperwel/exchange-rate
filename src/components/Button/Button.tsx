import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  display: inline-block;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: 2px 4px 10px 0px #0000004f;
  padding: 10px 20px;
  color: #666;
  margin: 3px;
  display: inline-flex;
  align-items: center;
`;

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ onClick, children }: Props) => (
  <ButtonStyled onClick={onClick}>{children}</ButtonStyled>
);

export default Button;
