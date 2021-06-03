import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
const PageElement = styled.div`
  width: 100%;
  text-align: right;
  margin-bottom: 5px;
`;
const TitleAndCreate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  h1 {
    display: inline-block;
  }
`;

const BoardTitle = ({ children, totalElements }) => {
  return (
    <>
      <TitleAndCreate>
        <h1>{children}</h1>
        <Link to="">
          <Fab size="small" color="secondary" aria-label="edit">
            <EditIcon />
          </Fab>
        </Link>
      </TitleAndCreate>
      <PageElement>전체 게시글 수 : {totalElements}</PageElement>
    </>
  );
};

export default BoardTitle;
