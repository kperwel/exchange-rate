import React from "react";
import styled, { css } from "styled-components";

const ButtonStyled = styled.button`
  border-radius: 4px;
  box-shadow: 2px 4px 10px 0px #0000004f;
  padding: 10px 20px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.5em;
  margin: 10px auto;
  transition: 50ms transform linear;
  text-transform: uppercase;
  position: relative;

  ${({ disabled }: Partial<ButtonProps>) =>
    disabled
      ? css`
          &::after {
            pointer-events: none;
            content: attr(data-message);
            transition: 100ms opacity linear, 100ms transform linear;
            position: absolute;
            display: block;
            background: #333;
            width: 95%;
            top: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(-10px);
            color: #fff;
            opacity: 0;
            padding: 4px;
            font-size: 0.7em;
            white-space: nowrap;
          }

          &:hover::after {
            opacity: 1;
            transform: translateX(-50%) translateY(5px);
          }
        `
      : ""}

  & > svg {
    margin-left: 10px;
  }

  ${({ primary, disabled }: Partial<ButtonProps>) =>
    disabled
      ? css`
          color: #9a9898;
          background: #e4e2e2;
          border: 1px solid #cde2fb;
          box-shadow: none;
        `
      : primary
      ? css`
          color: #fff;
          background: #3b6392;
          border: 1px solid #cde2fb;
        `
      : css`
          color: #333;
          background: #fff;
          border: 1px solid #eee;
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
  primary?: boolean;
  disabled?: boolean;
  message?: string | null;
}

const Button = ({ onClick, children, primary, disabled, message }: ButtonProps) => (
  <ButtonStyled type="button" data-message={message} primary={primary} disabled={disabled} onClick={onClick}>
    {children}
  </ButtonStyled>
);

export default Button;
