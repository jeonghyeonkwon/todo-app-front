import React from 'react';
import styled from 'styled-components';
import Header from '../components/section/Header';
import Side from '../components/section/Side';
import Footer from '../components/section/Footer';
const AsideMain = styled.div`
  margin-top: 20px;
  display: flex;
`;

const FramePage = ({ children }) => {
  return (
    <>
      <Header />
      <AsideMain>
        <Side />
        {children}
      </AsideMain>
      <Footer />
    </>
  );
};

export default FramePage;
