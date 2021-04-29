import React from 'react';
import styled from 'styled-components';
import { kind } from '../../data/tagData';

const TagsComponent = styled.div`
  background: ${(props) => props.back};
  color: ${(props) => props.font};
  border-radius: 5px;
  text-align: center;
  display: ${(props) => props.display || 'inline-block'};
  border: 1px solid #eee;
  padding: 0 4px;
`;
const Tags = ({ data, style }) => {
  const { backGround, fontColor, kor, display } = kind[data];
  return (
    <TagsComponent
      style={style}
      back={backGround}
      font={fontColor}
      display={display}
    >
      {kor}
    </TagsComponent>
  );
};

export default Tags;
