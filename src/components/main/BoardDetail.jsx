import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';
import Tags from '../common/Tags';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loading from '../common/Loading';
const Tabel = styled.table`
  width: 100%;
  /* border: 1px solid red; */
  thead {
    tr {
      th {
        background: rgb(111, 187, 118);
        padding: 5px;
        width: 15%;
        color: #fff;
      }
      td {
        background: rgb(207, 219, 118);
        padding: 10px;
        * {
          margin: 0px 5px;
        }
      }
    }
  }
  tbody {
    td {
      padding: 15px;
    }
    /* border: 1px solid red; */
  }
`;

const ReplyInput = styled.div`
  width: 100%;
  display: flex;

  padding: 5px;
`;
const ReplyForm = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid dodgerblue; */
`;
const Form = styled.div`
  padding: 20px;
  border: 1px solid gray;
  box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.3);
  border-radius: 5px;
  width: 100%;
`;
const BoardDetailComponent = styled.div`
  padding: 20px;

  /* border: 1px solid red; */
  /* height: 800px; */
  display: flex;
  width: 100%;
  background: #fff;
`;
const BoardDetail = ({ location, history, section }) => {
  const [detail, setDetail] = useState({
    id: '',
    detail: '',
    writer: '',
    programmingType: [],
    applicant: '',
    status: '',
    commentList: [],
    hit: 0,
    createStudy: '',
  });

  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector(({ user }) => ({
    currentUser: user.account.accountId,
  }));

  const [comment, setComment] = useState('');
  const onChange = (e) => {
    setComment(e.target.value);
    console.log(comment);
  };
  const onClickComment = async (e) => {
    e.preventDefault();
    if (!comment.length || comment.length > 50) {
      alert('1자 이상 50자 이내의 내용을 입력하세요');
      return;
    }
    console.log(`댓글 쓰기 ${comment}`);
    e.preventDefault();
    const response = (token) =>
      axios.post(
        `http://localhost:8080/api/${section}/${detail.id}`,
        JSON.stringify({ comment: comment }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token.replace(/\"/gi, '')}`,
          },
        },
      );
    try {
      const token = localStorage.getItem('jwttoken');
      console.log(token);
      await response(token)
        .then((res) => {
          if (res.status === 201) {
            alert('댓글입력을 완료 하였습니다.');
            window.location.reload();
          }
        })
        .catch((e) => {
          console.log(e);
          alert('작성 중 에러가 발생했습니다 다시 시도해 주세요');
          window.location.reload();
        });
    } catch (e) {
      alert('로그인에 문제가 있습니다. 다시 로그인해 주세요.');
    }
  };
  const onClickClosing = async (e) => {
    e.preventDefault();
    const response = (token) =>
      axios.patch(
        `http://localhost:8080/api/${section}/${detail.id}`,
        detail.id,
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token.replace(/\"/gi, '')}`,
          },
        },
      );
    try {
      const token = localStorage.getItem('jwttoken');
      console.log(token);
      await response(token)
        .then((res) => {
          if (res.status === 200) {
            alert('마감 하였습니다.');
            window.location.reload();
          }
        })
        .catch((e) => {
          console.log(e);
          alert('작성 중 에러가 발생했습니다 다시 시도해 주세요');
          window.location.reload();
        });
    } catch (e) {
      alert('로그인에 문제가 있습니다. 다시 로그인해 주세요.');
    }
  };
  useEffect(() => {
    const boardId = location.pathname.split('/')[3];
    const fetchDetail = async (token) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/${section}/${boardId}`,
          {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              Authorization: `Bearer ${token.replace(/\"/gi, '')}`,
            },
          },
        );
        console.log(response);
        setDetail(response.data);
      } catch (e) {
        console.log(`${e} 함수 안`);
        alert(e);
        //alert('내용에 문제가 있습니다. 다시 시도 해주세요');
        //history.push('/');
      }
      setLoading(false);
    };
    try {
      const token = localStorage.getItem('jwttoken');
      console.log(`token ${token}`);
      fetchDetail(token);
    } catch (e) {
      console.log('2');

      alert('내용에 문제가 있습니다. 다시 시도 해주세요');
      //history.push('/');
    }
  }, []);
  useEffect(() => {
    console.log(detail);
    console.log(`type ${section}`);
  }, [detail]);
  return (
    <BoardDetailComponent>
      {loading || !detail ? (
        <Loading />
      ) : (
        <Form>
          <h1>게시글</h1>
          <Tabel>
            <thead>
              {section === 'study' ? (
                <tr>
                  <th colSpan={1}>NO.</th>
                  <td colSpan={3}>{detail.id}</td>
                  <th colSpan={1}>모집인원</th>
                  {detail.status === 'finish' ? (
                    <td colSpan={3}>
                      <Tags data="finish"></Tags>
                    </td>
                  ) : (
                    <td colSpan={3}>{detail.applicant}명</td>
                  )}
                  <th colSpan={1}>조회수</th>
                  <td colSpan={3}>{detail.hit}</td>
                </tr>
              ) : (
                <tr>
                  <th colSpan={1}>NO.</th>
                  <td colSpan={7}>{detail.id}</td>
                  <th colSpan={1}>조회수</th>
                  <td colSpan={3}>{detail.hit}</td>
                </tr>
              )}
              <tr>
                <th colSpan={1}>작성자</th>
                <td colSpan={3}>{detail.writer}</td>
                <th colSpan={1}>분야</th>
                <td colSpan={3}>
                  {detail.programmingType.map((data) => (
                    <Tags key={data.title} data={data.title}></Tags>
                  ))}
                </td>
                <th colSpan={1}>작성 일시</th>
                <td colSpan={3}>{detail.createBoard}</td>
              </tr>
              <tr>
                <th colSpan={1}>제목</th>
                <td colSpan={11}>{detail.title}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan={6}>{detail.contents}</td>
              </tr>
            </tbody>
          </Tabel>
          {currentUser === detail.writer &&
            detail.status === 'ing' &&
            section === 'study' && (
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={onClickClosing}
              >
                마감 하기
              </Button>
            )}

          <ReplyForm>
            <ReplyInput>
              <TextField
                id="outlined-full-width"
                label="댓글 달기"
                style={{ margin: 10, flex: 9 }}
                placeholder="댓글 내용"
                helperText="1~52자 이내 글자를 입력하세요"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={onChange}
                value={comment}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ height: 55, marginTop: 11, flex: 1 }}
                onClick={onClickComment}
              >
                댓글 입력
              </Button>
            </ReplyInput>
          </ReplyForm>
        </Form>
      )}
    </BoardDetailComponent>
  );
};

export default withRouter(BoardDetail);
