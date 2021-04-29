import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import axios from 'axios';
const LocalList = ({ local, onClickLocal }) => {
  const [localList, setLocalList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/locallist');
        setLocalList(response.data.local);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(`로컬리즈트 ${local}`);
    console.log(localList);
  }, [localList]);
  return (
    <div>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        {localList.map((data) => {
          return local === data.eng ? (
            <Button key={data.eng} value={data.eng} disabled>
              {data.kor}
            </Button>
          ) : (
            <Button
              key={data.eng}
              value={data.eng}
              onClick={() => onClickLocal(data.eng)}
            >
              {data.kor}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
};

export default LocalList;
