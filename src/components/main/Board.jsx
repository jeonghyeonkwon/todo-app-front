import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Pagination } from '@material-ui/lab';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Tags from '../common/Tags';
import { Link, withRouter } from 'react-router-dom';
import { menuData } from './Kinds';
import axios from 'axios';
import Loading from '../common/Loading';
const columns = [
  { id: 'no', label: 'No.', width: '10%' },
  { id: 'title', label: '제목', width: '40%' },
  {
    id: 'writer',
    label: '작성자',
    width: '15%',
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
    width: '15%',
    align: 'center',
  },
];
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

// function createData(no, title, writer, types) {
//   const status = 11;
//   return { no, title, writer, types, status };
// }

// const rows = [
//   createData(
//     112345,
//     '리액트 스터디 모집해요 리액트 스터디 모집해요 리액트 스터디 모집해요 리액트 스터디 모집해요 리액트 스터디 모집해요',
//     'givejeong1234',
//     ['react', 'rubyon'],
//   ),
//   createData(1345, '리액트 스터디 모집해요', 'givejeong1234', ['spring']),
//   createData(11245124123123, '리액트 스터디 모집해요', 'givejeong1234', [
//     'rubyon',
//     'javascript',
//   ]),
//   createData(1345, '리액트 스터디 모집해요', 'givejeong1234', [
//     'react',
//     'kotilin',
//   ]),
//   createData(122345, '리액트 스터디 모집해요', 'givejeong1234', ['c', 'cp']),
//   createData(11445, '리액트 스터디 모집해요', 'givejeong1234', [
//     'react',
//     'python',
//   ]),
//   createData(11255, '리액트 스터디 모집해요', 'givejeong1234', [
//     'react',
//     'python',
//   ]),
//   createData(11237, '리액트 스터디 모집해요', 'givejeong1234', [
//     'react',
//     'python',
//   ]),
//   createData(11285, '리액트 스터디 모집해요', 'givejeong1234', [
//     'react',
//     'python',
//   ]),
//   createData(11045, '리액트 스터디 모집해요', 'givejeong1234', [
//     'react',
//     'python',
//   ]),
//   createData(16345, '리액트 스터디 모집해요', 'givejeong1234', [
//     'react',
//     'python',
//   ]),
//   createData(32345, '리액트 스터디 모집해요', 'givejeong1234', [
//     'react',
//     'python',
//   ]),
//   createData(11345, '리액트 스터디 모집해요', 'givejeong1234', [
//     'react',
//     'python',
//   ]),
// ];
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
  qna: {
    kor: '질문 게시판',
  },
  study: {
    kor: '스터디 모집',
  },
};
const Board = ({ location }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const type = location.pathname.split('/')[1];
  const section = location.pathname.split('/')[2];
  const [page, setPage] = useState(0);
  const [form, setForm] = useState({
    totalPage: 0,
    totalElements: 0,
    hasNext: false,
    hasPrevious: false,
    list: [],
  });
  const kor = boardTitle[type];
  const sort = menuData.find((data) => data.type === section);
  useEffect(() => {
    console.log(`type ${type} section ${section}`);
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/${type}?section=${section}&page=${page}`,
        );
        setForm(response.data);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const pageChange = (event, value) => {
    setPage(value - 1);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/${type}?section=${section}&page=${page}`,
        );
        setForm(response.data);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [page, type, section]);
  return (
    <BoardComponent>
      {loading && !form.list ? (
        <Loading></Loading>
      ) : (
        <>
          <TitleAndCreate>
            <h1>
              {kor.kor} ({sort.name})
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
                  {form.list.map((row) => (
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
                      <StyledTableCell align="right">
                        {row.status === 'ing' ? (
                          `${row.applicant}명`
                        ) : (
                          <Tags data="finish"></Tags>
                        )}
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
            count={form.totalPage}
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
