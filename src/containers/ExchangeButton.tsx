import React from "react";
import Button from "../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { exchange } from "../store/user/actions";
import { getTransaction } from "../store/selectors";

const ExchangeButton = () => {
  const dispatch = useDispatch();
  const transaction = useSelector(getTransaction);

  const onClick = () => dispatch(exchange(transaction));
  return <Button onClick={onClick}>Echange</Button>;
};

export default ExchangeButton;
