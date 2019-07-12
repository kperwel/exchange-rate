import React, { useCallback } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { exchange } from "../store/user/actions";
import { getTransaction, getIsTransactionValid } from "../store/selectors";

import { TrendingUp } from "react-feather";

const ExchangeButton = () => {
  const dispatch = useDispatch();
  const transaction = useSelector(getTransaction);
  const isTransactionValid = useSelector(getIsTransactionValid);

  const onClick = useCallback(() => dispatch(exchange(transaction)), [transaction, dispatch]);
  return (
    <>
      <Button primary message={!isTransactionValid ? "Insufficient funds" : null} disabled={!isTransactionValid} onClick={onClick}>
        Echange <TrendingUp />
      </Button>
    </>
  );
};

export default ExchangeButton;
