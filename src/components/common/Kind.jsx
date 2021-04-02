import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
const Square = styled.div`
  width: 350px;
  height: 350px;
  position: relative;
  margin: 40px;
  border: 1px solid red;
  span {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid #a79d9d;
    border-radius: 40% 60% 65% 35% / 40% 45% 55% 60%;
    transition: 0.5s;
    animation: circle 5s linear infinite;
    &:nth-child(1) {
      animation: circle 6s linear infinite;
    }
    &:nth-child(2) {
      animation: circle 4s linear infinite;
      animation-direction: reverse;
    }
    &:nth-child(3) {
      animation: circle 10s linear infinite;
    }
  }
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    text-align: center;
    color: #a79d9d;
    a {
      color: #a79d9d;
      border-radius: 40% 60% 65% 35% / 40% 45% 55%;
      border: 2px solid #a79d9d;
      padding: 10px;
    }
  }
  &:hover {
    span {
      background: ${(props) => props.color};
      border: none;
      &:nth-child(1) {
        opacity: 0.3;
      }
      &:nth-child(2) {
        opacity: 0.5;
      }
      &:nth-child(3) {
        opacity: 0.8;
      }
    }
    div {
      color: #fff;
      a {
        color: #fff;
        border: 2px solid #fff;
        transition: 0.3s;
        &:hover {
          color: ${(props) => props.color};
          background: #fff;
        }
      }
    }
  }

  @keyframes circle {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const KindComponent = styled.div`
  display: inline-block;
  border: 1px solid dodgerblue;
`;
const Kind = ({ data, section }) => {
  const { name, contents, color, type } = data;

  return (
    <KindComponent>
      <Square color={color}>
        <span></span>
        <span></span>
        <span></span>
        <div>
          <h1>{name}</h1>
          <p>{contents}</p>
          <Link to={`/${section}/${type}`}>들어가기</Link>
        </div>
      </Square>
    </KindComponent>
  );
};

export default Kind;
