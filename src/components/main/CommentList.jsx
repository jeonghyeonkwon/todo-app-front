import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Pagination } from '@material-ui/lab';
import Loading from '../common/Loading';
const Reply = styled.div`
  border: 1px solid gray;
  padding: 15px 15px 5px 15px;
  margin-bottom: 5px;
  border-radius: 15px;
  background-color: #eee;
  label {
    font-weight: bold;
    font-size: 18px;

    margin-right: 20px;
  }
`;
const PageCenter = styled.div`
  text-align: center;
`;
const CommentListComponent = styled.div`
  width: 100%;
`;
const CommentList = ({ loading, list, onChange, page }) => {
  return (
    <CommentListComponent>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {list &&
            list.content.map((data, index) => (
              <Reply key={data.writer + data.comment}>
                <label>{data.writer}</label>
                <i>{data.createComment}</i>
                <p>{data.comment}</p>
              </Reply>
            ))}
          <PageCenter>
            <Pagination
              style={{
                marginTop: 20,
                display: 'inline-block',
              }}
              size="large"
              count={list.totalPages}
              page={page + 1}
              onChange={onChange}
              variant="outlined"
              color="secondary"
              boundaryCount={10}
            />
          </PageCenter>
        </div>
      )}
    </CommentListComponent>
  );
};

export default CommentList;
