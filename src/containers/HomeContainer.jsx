import { Skeleton } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loading from '../components/common/Loading';
import BoardView from '../components/main/BoardView';
import RankView from '../components/main/RankView';
const Form = styled.div`
  width: 100%;
`;
const Title = styled.div``;

const HomeComponent = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 25px;
`;
const HomeContainer = () => {
  const [form, setForm] = useState({
    study: [],
    qna: [],
    rank: [],
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/home');
        setForm(response.data);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <HomeComponent>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Form>
            <Title>
              <h1>SKILL RANK</h1>
            </Title>
            {form.rank ? (
              <RankView rank={form.rank} />
            ) : (
              <Skeleton variant="rect" width={210} />
            )}
          </Form>
          <Form>
            <Title>
              <h1>게시판</h1>
            </Title>
            <BoardView qna={form.qna} study={form.study} />
          </Form>
        </>
      )}
    </HomeComponent>
  );
};

export default HomeContainer;
