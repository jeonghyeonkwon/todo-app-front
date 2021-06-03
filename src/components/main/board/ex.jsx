import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Tags from '../common/Tags';
import { Link, withRouter } from 'react-router-dom';
import { menuData } from '../../data/menuData';
import axios from 'axios';
import { Pagination } from '@material-ui/lab';
import Loading from '../common/Loading';
import qs from 'qs';

import LocalList from './LocalList';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#a0d0bf',
    color: theme.palette.common.white,

    padding: 10,
    fontSize: 16,
  },
  body: {
    padding: 5,
    fontSize: 14,
  },
}))(TableCell);
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    color: '#000',
    '&:hover': {
      color: 'dodgerblue',
      transition: '0.3s',
    },
  },
});

const TitleAndCreate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  h1 {
    display: inline-block;
  }
`;
const PageElement = styled.div`
  width: 100%;
  text-align: right;
  margin-bottom: 5px;
`;
const BoardComponent = styled.div`
  padding: 20px;
  flex: 4;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
`;
const boardTitle = {
  qna: '질문 게시판',
  study: '스터디 모집',
};
const Board = ({ location, columns, history }) => {
  const classes = useStyles();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const [loading, setLoading] = useState(false);
  const type = location.pathname.split('/')[1];
  const section = location.pathname.split('/')[2];
  const [page, setPage] = useState(query.page ? query.page : 0);
  const [local, setLocal] = useState(query.local ? query.local : 'ALL');

  const [form, setForm] = useState({
    totalPage: 0,
    totalElements: 0,
    hasNext: false,
    hasPrevious: false,
    list: [],
  });
  const kor = boardTitle[type];
  const sort = menuData.find((data) => data.type === section);
  const onClickLocal = (local) => {
    console.log(local);
    setLocal(local);
  };
  useEffect(() => {
    history.push(`/${type}/${section}?page=${page}&local=${local}`);
    console.log(`type ${type} section ${section}`);
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/${type}?section=${section}&page=${page}&size=10&local=${local}`,
        );
        setForm(response.data);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [page, type, section, local]);

  const pageChange = (event, value) => {
    setPage(value - 1);
  };

  return (
    <BoardComponent>
      {loading && !form ? (
        <Loading></Loading>
      ) : (
        <>
          {type === 'study' && (
            <LocalList local={local} onClickLocal={onClickLocal}></LocalList>
          )}
          <TitleAndCreate>
            <h1>
              {kor} ({sort.name})
            </h1>
            <Link to={`${location.pathname}/write`}>
              <Fab size="small" color="secondary" aria-label="edit">
                <EditIcon />
              </Fab>
            </Link>
          </TitleAndCreate>
          <PageElement>전체 게시글 수 : {form.totalElements}</PageElement>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ width: column.width }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              {form.totalElements === 0 ? (
                <TableBody>
                  <StyledTableCell colSpan={5} style={{ textAlign: 'center' }}>
                    게시글이 없습니다.
                  </StyledTableCell>
                </TableBody>
              ) : (
                <TableBody>
                  {form.content.map((row) => (
                    <TableRow key={row.id}>
                      <StyledTableCell>
                        {row.id.toString().length > 10
                          ? `${row.id.toString().slice(0, 7)}...`
                          : row.id.toString()}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Link
                          to={`/${type}/board/${row.id}`}
                          className={classes.title}
                        >
                          {row.title.length > 30
                            ? `${row.title.slice(0, 27)}...`
                            : row.title}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.writer}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.roleTypeDtoList.map((type, i) => (
                          <Tags
                            style={{ margin: '0px 2px' }}
                            key={row + type}
                            data={type.title}
                          ></Tags>
                        ))}
                      </StyledTableCell>
                      {type === 'study' && (
                        <StyledTableCell align="right">
                          {row.status === 'ing' ? (
                            `${row.applicant}명`
                          ) : (
                            <Tags data="finish"></Tags>
                          )}
                        </StyledTableCell>
                      )}
                      <StyledTableCell align="center">
                        {row.hit}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.createStudy}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <Pagination
            style={{
              marginTop: 20,
              display: 'inline-block',
            }}
            size="large"
            count={form.totalPages}
            onChange={pageChange}
            variant="outlined"
            color="primary"
            boundaryCount={10}
          />
        </>
      )}
    </BoardComponent>
  );
};

export default withRouter(Board);
