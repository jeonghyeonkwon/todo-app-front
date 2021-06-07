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
import { studyList, initialize, LIST } from '../../modules/study';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/common/Loading';
import LocalList from '../../components/main/LocalList';
import { localList, LOCAL } from '../../modules/common';
import { boardTitle } from '../../data/menuData';
const columns = [
  { id: 'no', label: 'No.', width: '7%' },
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
    id: 'status',
    label: '모집인원',
    width: '7%',
    align: 'center',
  },
  {
    id: 'hitCnt',
    label: '조회수',
    width: '10%',
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
const StudyBoardContainer = ({ location, history }) => {
  const dispatch = useDispatch();
  const skill = location.pathname.split('/')[2];
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const page = parseInt(query.page);
  const [form, setForm] = useState({
    page: page || 0,
    pick: query.local || 'ALL',
  });
  const { content, totalElements, totalPages, loading, local, localLoading } =
    useSelector(({ study, loading, common }) => ({
      local: common.local,
      localLoading: loading[LOCAL],
      content: study.list.content,
      totalElements: study.list.totalElements,
      totalPages: study.list.totalPages,
      loading: loading[LIST],
    }));

  const onChangePage = useCallback(
    (e, value) => {
      setForm({
        ...form,
        page: value - 1,
      });
    },
    [form],
  );
  const onChangeLocal = useCallback((eng) => {
    setForm({
      pick: eng,
      page: 0,
    });
  });
  useEffect(() => {
    setForm({
      ...form,
      page: page || 0,
      pick: query.local || 'ALL',
    });
  }, [skill]);
  useEffect(() => {
    history.push(`/study/${skill}?page=${form.page}&local=${form.pick}`);

    console.log(
      '--------------------------------리덕스 액션--------------------------------',
    );
    console.log(`skill ${skill} --- page ${form.page} --- local ${form.pick}`);
    dispatch(studyList({ skill, page: form.page, local: form.pick }));
  }, [form.pick, form.page, skill]);

  useEffect(() => {
    if (!local.length) dispatch(localList());
  }, [local]);

  return (
    <BoardContainer>
      <LocalList
        local={local}
        loading={localLoading}
        onChangeLocal={onChangeLocal}
        pick={form.pick}
      />
      <BoardTitle totalElements={totalElements} boardType="study" skill={skill}>
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
                    <BoardCell align="right">
                      {data.status === 'ing' ? (
                        `${data.applicant}명`
                      ) : (
                        <Tags data="finish"></Tags>
                      )}
                    </BoardCell>
                    <BoardCell align="center">{data.hit}</BoardCell>
                    <BoardCell align="right">{data.createStudy}</BoardCell>
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
        page={form.page + 1}
        onChange={onChangePage}
        variant="outlined"
        color="primary"
        boundaryCount={10}
      />
    </BoardContainer>
  );
};

export default withRouter(StudyBoardContainer);
