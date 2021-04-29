import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Tags from '../common/Tags';
import Skeleton from '@material-ui/lab/Skeleton';
const List = styled.table`
  width: 100%;
  thead {
    tr {
      th {
        &::nth-child(1) {
          width: 70%;
        }
        &::nth-child(2) {
          width: 30%;
        }
      }
    }
  }
  tbody {
    tr {
      td {
        a {
          transition: 0.3s;
          &:hover {
            color: dodgerblue;
          }
        }
      }
    }
  }
`;
const ViewTitle = styled.div`
  padding: 0px 15px;
  border: 3px solid rgb(59, 89, 152);
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    color: rgb(59, 89, 152);
    font-weight: bold;
  }
  a {
    text-align: right;
    transition: 0.5s;
    &:hover {
      color: dodgerblue;
    }
  }
`;
const View = styled.div`
  flex: 1;
  /* border: 1px solid blue; */
`;
const BoardViewComponent = styled.div`
  width: 100%;
  height: 380px;
  /* border: 1px solid red; */
  display: flex;
  ${View}:nth-child(1) {
    ${ViewTitle} {
      border-radius: 10px 0px 0px 0px;
      border-right: 1px;
    }
  }
  ${View}:nth-child(2) {
    ${ViewTitle} {
      border-radius: 0px 10px 0px 0px;
      border-left: 1px;
    }
  }
`;
const BoardView = ({ study, qna }) => {
  return (
    <BoardViewComponent>
      <View>
        <ViewTitle>
          <h2>스터디</h2>
          <Link to="/study">더보기</Link>
        </ViewTitle>
        <List>
          <thead>
            <tr>
              <th>제목</th>
              <th>skill</th>
            </tr>
          </thead>
          {study.length !== 0 ? (
            <tbody>
              {study.map((data) => (
                <tr>
                  <td>
                    <Link to={`/study/board/${data.id}`}>{data.title}</Link>
                  </td>
                  <td>
                    {data.roleTypeDtoList.map((type) => (
                      <Tags data={type.title} />
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={2}>
                  <Skeleton variant="text" />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Skeleton variant="text" />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Skeleton variant="text" />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Skeleton variant="text" />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Skeleton variant="text" />
                </td>
              </tr>
            </tbody>
          )}
        </List>
      </View>
      <View>
        <ViewTitle>
          <h2>Q&A</h2>
          <Link to="/qna">더보기</Link>
        </ViewTitle>
        <List>
          <thead>
            <tr>
              <th>제목</th>
              <th>skill</th>
            </tr>
          </thead>
          {study.length !== 0 ? (
            <tbody>
              {qna.map((data) => (
                <tr>
                  <td>
                    <Link to={`/qna/board/${data.id}`}>{data.title}</Link>
                  </td>
                  <td>
                    {data.roleTypeDtoList.map((type) => (
                      <Tags data={type.title} />
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={2}>
                  <Skeleton variant="text" />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Skeleton variant="text" />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Skeleton variant="text" />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Skeleton variant="text" />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Skeleton variant="text" />
                </td>
              </tr>
            </tbody>
          )}
        </List>
      </View>
    </BoardViewComponent>
  );
};

export default BoardView;
