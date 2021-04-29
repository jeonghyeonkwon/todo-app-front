import React from 'react';
import styled from 'styled-components';
import Kind from '../common/Kind';
import { menuData } from '../../data/menuData';

const KindsComponent = styled.div`
  flex: 4;
`;
const Kinds = ({ section }) => {
  return (
    <KindsComponent>
      {menuData.map((data) => {
        console.log(data);
        return <Kind key={data.name} data={data} section={section}></Kind>;
      })}
    </KindsComponent>
  );
};

export default Kinds;
