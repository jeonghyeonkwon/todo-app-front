import React from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';
import Tags from '../common/Tags';
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
const typeTitle = {
  study: '스터디 모집',
  qna: 'Q&A',
};
const BoardDetail = ({
  detail,
  boardType,
  accountId,
  comment,
  onClickComment,
  loading,
  onClickClosing,
  onChange,
}) => {
  return (
    <BoardDetailComponent>
      {loading ? (
        <Loading />
      ) : (
        <Form>
          <h1>{typeTitle[boardType]} 게시글</h1>
          <Tabel>
            <thead>
              {boardType === 'study' ? (
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
          {accountId === detail.writer &&
            detail.status === 'ing' &&
            boardType === 'study' && (
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
