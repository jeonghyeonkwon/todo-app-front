import React, { useCallback, useEffect, useState } from 'react';
import Board from '../../components/main/Board';
import BoardTitle from '../../components/main/board/BoardTitle';
import styled from 'styled-components';
import BoardHead from '../../components/main/board/BoardHead';
import BoardRow from '../../components/main/board/BoardRow';
import BoardCell from '../../components/main/board/BoardCell';
import BoardBody from '../../components/main/board/BoardBody';
import Tags from '../../components/common/Tags';
import { Pagination } from '@material-ui/lab';
import { withRouter, Link } from 'react-router-dom';

import qs from 'qs';
import { qnaList, initialize, LIST } from '../../modules/qna';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/common/Loading';
import { boardTitle } from '../../data/menuData';

const columns = [
  { id: 'no', label: 'No.', width: '10%' },
  { id: 'title', label: '제목', width: '25%' },
  {
    id: 'writer',
    label: '작성자',
    width: '10%',
    align: 'right',
  },
  {
    id: 'types',
    label: '세부 분야',
    width: '20%',
    align: 'center',
  },
  {
    id: 'hitCnt',
    label: '조회수',
    width: '8%',
    align: 'center',
  },
  {
    id: 'createBoard',
    label: '작성날짜',
    width: '10%',
    align: 'right',
  },
];
const BoardContainer = styled.div`
  display: flex;
  padding: 50px;
  flex: 4;
  height: 800px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
`;
const QnaBoardContainer = ({ location, history }) => {
  const dispatch = useDispatch();
  const skill = location.pathname.split('/')[2];
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const queryPage = parseInt(query.page);
  const { content, totalElements, totalPages, loading } = useSelector(
    ({ qna, loading }) => ({
      content: qna.list.content,
      totalElements: qna.list.totalElements,
      totalPages: qna.list.totalPages,
      loading: loading[LIST],
    }),
  );

  const [page, setPage] = useState(queryPage || 0);

  const onChangePage = useCallback(
    (e, value) => {
      setPage(value - 1);
    },
    [page],
  );
  useEffect(() => {
    setPage(page || 0);
  }, [skill]);
  useEffect(() => {
    history.push(`/qna/${skill}?page=${page}`);
    dispatch(qnaList({ skill, page }));
  }, [page, skill]);
  return (
    <BoardContainer>
      <BoardTitle totalElements={totalElements} boardType="qna" skill={skill}>
        질문게시판 ({boardTitle[skill]})
      </BoardTitle>
      <Board>
        <BoardHead>
          <BoardRow>
            {columns.map((column) => (
              <BoardCell key={column.id} column={column} />
            ))}
          </BoardRow>
        </BoardHead>
        <BoardBody>
          {loading ? (
            <Loading />
          ) : (
            <>
              {content.length > 0 ? (
                content.map((data) => (
                  <BoardRow key={data.id}>
                    <BoardCell>
                      {data.id.toString().length > 10
                        ? `${data.id.toString().slice(0, 7)}...`
                        : data.id.toString()}
                    </BoardCell>
                    <BoardCell>
                      <Link to="">
                        {data.title.length > 30
                          ? `${data.title.slice(0, 27)}...`
                          : data.title}
                      </Link>
                    </BoardCell>
                    <BoardCell align="right">{data.writer}</BoardCell>
                    <BoardCell align="center">
                      {data.roleTypeDtoList.map((type, i) => (
                        <Tags
                          style={{ margin: '0px 2px' }}
                          key={i + type}
                          data={type.title}
                        />
                      ))}
                    </BoardCell>
                    <BoardCell align="center">{data.hit}</BoardCell>
                    <BoardCell align="right">{data.createQna}</BoardCell>
                  </BoardRow>
                ))
              ) : (
                <BoardRow>
                  <BoardCell colSpan={6} align="center">
                    게시글이 없습니다.
                  </BoardCell>
                </BoardRow>
              )}
            </>
          )}
        </BoardBody>
      </Board>
      <Pagination
        style={{
          marginTop: 20,
          display: 'inline-block',
        }}
        size="large"
        count={totalPages}
        page={page + 1}
        onChange={onChangePage}
        variant="outlined"
        color="primary"
        boundaryCount={10}
      />
    </BoardContainer>
  );
};

export default withRouter(QnaBoardContainer);
