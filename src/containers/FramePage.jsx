import React from 'react';
import styled from 'styled-components';
import Header from '../components/section/Header';
import Side from '../components/section/Side';
import Footer from '../components/section/Footer';
const AsideMain = styled.div`
  margin-top: 20px;
  display: flex;
`;
const MainComponent = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 25px;
`;
const FramePage = ({ children }) => {
  return (
    <>
      <Header />
      <AsideMain>
        <Side />
        <MainComponent>{children}</MainComponent>
      </AsideMain>
      <Footer />
    </>
  );
};

export default FramePage;
