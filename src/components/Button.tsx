import React from "react";
import styled, { css } from "styled-components";

const ButtonStyled = styled.button`
  box-shadow: 2px 4px 10px 0px #0000004f;
  padding: 10px 20px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1em;
  margin: 10px auto;
  transition: 50ms transform linear;
  position: relative;

  & > svg {
    margin-left: 10px;
  }

  ${({ disabled }: Partial<ButtonProps>) =>
    disabled
      ? css`
          color: #9a9898;
          background: #e4e2e2;
          border: 1px solid #cde2fb;
          box-shadow: none;
        `
      : css`
        color: #0a0a0a;
        background: #ffffff;
        border: 1px solid #cde2fb;
      `}

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: scale(0.95);
  }
`;

interface ButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  message?: string | null;
}

const Button = ({ onClick, children, disabled, message }: ButtonProps) => (
  <ButtonStyled data-message={message} type="button" disabled={disabled} onClick={onClick}>
    {children}
  </ButtonStyled>
);

export default Button;
