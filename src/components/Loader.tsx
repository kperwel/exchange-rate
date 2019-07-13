import React from "react";
import { Loader as LoaderIcon } from "react-feather";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Rotation = styled.div`
  animation: ${rotate} 2s linear infinite;
`;
const LoadingText = styled.span`
  margin-left: 10px;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <Rotation>
        <LoaderIcon size={32} />
      </Rotation>
      <LoadingText>Loading...</LoadingText>
    </LoaderContainer>
  );
};

export default Loader;
