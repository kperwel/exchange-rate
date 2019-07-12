import React from "react";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { swap } from "../store/user/actions";

import { RefreshCw } from 'react-feather';

const SwapButton = () => {
  const dispatch = useDispatch();
  const onClick = () => dispatch(swap());
  return <Button onClick={onClick}>Swap Currencies<RefreshCw/></Button>;
};

export default SwapButton;
