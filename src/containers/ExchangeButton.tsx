import React, { useCallback } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { exchange } from "../store/user/actions";
import { getTransaction, getTransactionValidationError } from "../store/selectors";

import { TrendingUp } from "react-feather";

const ExchangeButton = () => {
  const dispatch = useDispatch();
  const transaction = useSelector(getTransaction, shallowEqual);
  const error = useSelector(getTransactionValidationError, shallowEqual);

  const onClick = useCallback(() => dispatch(exchange(transaction)), [transaction, dispatch]);
  return (
    <>
      <Button primary message={error} disabled={!!error} onClick={onClick}>
        Echange <TrendingUp />
      </Button>
    </>
  );
};

export default ExchangeButton;
