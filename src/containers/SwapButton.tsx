import React from "react";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { swap } from "../store/user/actions";

import { RefreshCw } from 'react-feather';
import styled from "styled-components";

const SwapButtonStyled = styled.button`
    width: 50px;
    height: 50px;
    padding: 0;
    border-radius: 50%;
    outline: 0;
    position: absolute;
    right: -25px;
    top: -25px;
    border: 1px solid #eee;

    &:active {
      border: 1px solid #ddd;
    }
`



const SwapButton = () => {
  const dispatch = useDispatch();
  const onClick = () => dispatch(swap());
  return <SwapButtonStyled onClick={onClick}><RefreshCw/></SwapButtonStyled>;
};

export default SwapButton;
