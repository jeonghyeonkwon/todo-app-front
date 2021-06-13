import React from 'react';
import styled from 'styled-components';

import Progress from '../common/Progress';
import Skeleton from '@material-ui/lab/Skeleton';
const Item = styled.div``;
const Title = styled.div`
  border: 3px solid rgb(59, 89, 152);
  padding: 0px 15px;
`;
const Rank = styled.div`
  flex: 1;

  height: 350px;
  h2 {
    font-size: 20px;
    color: rgb(59, 89, 152);
    font-weight: bold;
  }
`;

const RankViewComponent = styled.div`
  display: flex;
  width: 100%;
  ${Rank} {
    &:nth-child(1) {
      ${Title} {
        border-radius: 10px 0px 0px 0px;
        border-right: none;
      }
    }
    &:nth-child(2) {
      ${Title} {
        border-right: none;
        border-left: none;
      }
    }
    &:nth-child(3) {
      ${Title} {
        border-radius: 0px 10px 0px 0px;
        border-left: none;
      }
    }
  }
`;
const RankView = ({ rank }) => {
  return (
    <RankViewComponent>
      {rank.length === 0 ? (
        <Skeleton variant="rect" width="100%" height={350} />
      ) : (
        <>
          <Rank>
            <Title>
              <h2>Study+Q&A</h2>
            </Title>
            {rank.totalRank && (
              <Item>
                {rank.totalRank.map((data) => (
                  <Progress data={data.language} rate={data.percent} />
                ))}
              </Item>
            )}
          </Rank>
          <Rank>
            <Title>
              <h2>Study</h2>
            </Title>
            {rank.studyRank && (
              <Item>
                {rank.studyRank.map((data) => (
                  <Progress data={data.language} rate={data.percent} />
                ))}
              </Item>
            )}
          </Rank>
          <Rank>
            <Title>
              <h2>Q&A</h2>
            </Title>
            {rank.qnaRank && (
              <Item>
                {rank.qnaRank.map((data) => (
                  <Progress data={data.language} rate={data.percent} />
                ))}
              </Item>
            )}
          </Rank>
        </>
      )}
    </RankViewComponent>
  );
};

export default RankView;
