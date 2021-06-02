import React from 'react';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';
import { menuData } from '../data/menuData';
import Kind from '../components/common/Kind';

const KindsComponent = styled.div`
  flex: 4;
`;
const BoardIntroContainer = ({ location }) => {
  const section = location.pathname.split('/')[1];
  return (
    <KindsComponent>
      {menuData.map((data) => (
        <Kind key={data.name} data={data} section={section} />
      ))}
    </KindsComponent>
  );
};

export default withRouter(BoardIntroContainer);
