import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import styled from 'styled-components';
import { Skeleton } from '@material-ui/lab';
const LocalListComponent = styled.div`
  width: 100%;
  text-align: center;
`;

const LocalList = ({ local, onChangeLocal, pick, loading }) => {
  return (
    <>
      {loading ? (
        <Skeleton variant="rect" height={40} width={'100%'} />
      ) : (
        <LocalListComponent>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            {local.map((data) => {
              return pick === data.eng ? (
                <Button key={data.eng} value={data.eng} disabled>
                  {data.kor}
                </Button>
              ) : (
                <Button
                  key={data.eng}
                  value={data.eng}
                  onClick={() => onChangeLocal(data.eng)}
                >
                  {data.kor}
                </Button>
              );
            })}
          </ButtonGroup>
        </LocalListComponent>
      )}
    </>
  );
};

export default React.memo(LocalList);
