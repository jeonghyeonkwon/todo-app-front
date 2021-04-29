import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
    /* border: 1px solid red; */
    margin-right: 20px;
  }
  i {
    /* border: 1px solid red; */
  }
  p {
    /* border: 1px solid red; */
  }
`;
const PageCenter = styled.div`
  text-align: center;
`;
const CommentList = ({ boardId, section }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [form, setForm] = useState([]);
  const [pageable, setPageable] = useState(0);
  const onChangePage = (e, value) => {
    e.preventDefault();
    setPage(value - 1);
  };
  //   useEffect(() => {
  //     console.log('처음 useEffect()');
  //     console.log(page);
  //   }, []);
  useEffect(() => {
    const fetchComment = async (token) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/${section}/${boardId}/comment?page=${page}&size=10`,
          {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              Authorization: `Bearer ${token.replace(/\"/gi, '')}`,
            },
          },
        );
        setForm(response.data.content);
        console.log(`useEffect form`);
        console.log(form);
        setPageable(response.data.totalPages);
      } catch (e) {
        alert(e);
      }
      setLoading(false);
    };
    try {
      const token = localStorage.getItem('jwttoken');
      console.log(`token ${token}`);
      fetchComment(token);
    } catch (e) {
      console.log('2');

      alert('내용에 문제가 있습니다. 다시 시도 해주세요');
      //history.push('/');
    }
  }, [page]);

  const CommentListComponent = styled.div`
    width: 100%;
  `;
  return (
    <CommentListComponent>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {form &&
            form.map((data, index) => (
              <Reply>
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
              count={pageable}
              page={page + 1}
              onChange={onChangePage}
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
