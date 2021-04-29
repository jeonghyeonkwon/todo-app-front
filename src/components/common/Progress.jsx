import React from 'react';
import styled from 'styled-components';
import Tags from './Tags';
const Title = styled.p`
  padding: 5px;
  margin: 0;
  span {
    float: right;
    font-weight: bold;
  }
`;
const ProgressLevel = styled.div`
  width: ${(props) => props.rate}%;

  height: 10px;
  background: linear-gradient(to right, crimson, gold);
  animation-name: spread;
  animation-duration: 1s;

  @keyframes spread {
    0% {
      width: 0;
    }
  }
`;
const ProgressComponent = styled.div`
  padding: 5px;
  border-radius: 3px;
`;
const Progress = ({ data, rate }) => {
  return (
    <>
      <Title>
        <Tags data={data}></Tags>
        <span>{rate}%</span>
      </Title>
      <ProgressComponent>
        <ProgressLevel rate={rate}></ProgressLevel>
      </ProgressComponent>
    </>
  );
};

export default Progress;
