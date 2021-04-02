import React from 'react';
import styled from 'styled-components';
const HomeComponent = styled.div`
  flex: 4;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

const Home = () => {
  return <HomeComponent>홈이다</HomeComponent>;
};

export default Home;
