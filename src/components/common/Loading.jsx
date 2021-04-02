import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  width: 40px;
  height: 40px;
  position: relative;

  span {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: gray;
    top: 0;
    left: 0;
    animation: loading 1.5s infinite;
    &:nth-child(1) {
      background-color: crimson;
    }
    &:nth-child(2) {
      animation-delay: 0.8s;
    }
    @keyframes loading {
      0%,
      100% {
        top: 0;
        left: 0;
      }
      25% {
        top: 0;
        left: calc(100% - 20px);
        background-color: dodgerblue;
      }
      50% {
        top: calc(100% - 20px);
        left: calc(100% - 20px);
        background-color: orange;
      }
      75% {
        top: calc(100% - 20px);
        left: 0;
        background-color: yellowgreen;
      }
      100% {
      }
    }
  }
`;
const LoadingComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  Div,
  & > span {
    margin: 10px 0px;
  }
`;
const Loading = () => {
  return (
    <LoadingComponent>
      <Div>
        <span></span>
        <span></span>
      </Div>
      <span>잠시만 기다려주세요...</span>
    </LoadingComponent>
  );
};

export default Loading;
