import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextField, Chip, makeStyles, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginTop: 20,
    },
  },
  btn: {
    display: 'block',
    textAlign: 'center',
    '& .MuiButtonBase-root': {
      margin: 20,
    },
  },
}));
const Form = styled.form`
  padding: 20px;
  border: 1px solid grey;
  border-radius: 20px;
  height: 80%;
  width: 70%;
  box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.3);
`;
const CreateBoardComponent = styled.div`
  flex: 4;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;
const CreateBoard = ({ location, history }) => {
  const classes = useStyles();
  const fixedOptions = location.pathname.split('/')[2];
  const [tag, setTag] = React.useState([]);
  const [form, setForm] = useState({
    title: '',
    contents: '',
    applicant: 0,
    programmingType: null,
  });
  const onChange = (e) => {
    const { value, name } = e.target;
    console.log(`value : ${value} name : ${name}`);
    if (name === 'applicant' && value < 0) {
      setForm({
        ...form,
        applicant: 0,
        programmingType: tag,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
        programmingType: tag,
      });
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // setForm({
    //   ...form,
    //   programmingType: tag,
    // });
    const { title, contents, programmingType } = form;
    if (
      !title ||
      !contents ||
      !(programmingType.length > 0 && programmingType.length < 3)
    ) {
      alert('빈 값을 채워 주세요');
      return;
    }
    console.log(programmingType);
    console.log('요청');
    console.log(form);
    const response = (token) =>
      axios.post(
        `http://localhost:8080/api/study?section=${fixedOptions}`,
        form,
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token.replace(/\"/gi, '')}`,
          },
        },
      );
    try {
      const token = localStorage.getItem('jwttoken');

      await response(token)
        .then((res) => {
          if (res.status === 201) {
            alert('게시글 작성에 완료되었습니다.');
            history.push(`/study/board/${res.data}`);
          }
        })
        .catch((e) => {
          console.log(e);
          alert('작성 중 에러가 발생했습니다 다시 시도해 주세요');
          window.location.reload();
        });
    } catch (e) {
      alert('로그인에 문제가 있습니다. 다시 로그인해 주세요.');
    }
  };
  useEffect(() => {
    setForm({
      ...form,
      programmingType: tag,
    });
  }, [tag]);
  return (
    <CreateBoardComponent>
      <Form className={classes.root}>
        <h1>게시 글 작성 ({category[fixedOptions].kor})</h1>

        <TextField
          label="제목"
          fullWidth
          onChange={onChange}
          name="title"
          value={form.title}
        />
        <TextField
          label="모집 인원"
          type="number"
          min="0"
          onChange={onChange}
          name="applicant"
          value={form.applicant}
        />
        <Autocomplete
          fullWidth
          multiple
          id="fixed-tags-demo"
          value={tag}
          onChange={(event, newValue) => {
            if (newValue.length > 2) {
              const [trash, ...val] = newValue;
              return setTag([...val]);
            } else {
              setTag([
                ...newValue.filter((option) => {
                  return fixedOptions.indexOf(option) === -1;
                }),
              ]);
            }
          }}
          options={types}
          getOptionLabel={(option) => {
            return option.kor;
          }}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
                label={option.title}
                {...getTagProps({ index })}
                disabled={fixedOptions.indexOf(option) !== -1}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="유형"
              variant="outlined"
              helperText="하위 유형 1~2개를 선택하세요"
            />
          )}
        />
        <TextField
          label="내용"
          fullWidth
          rows={8}
          multiline
          onChange={onChange}
          name="contents"
          value={form.contents}
        />
        <div className={classes.btn}>
          <Button variant="outlined" color="primary" onClick={onSubmit}>
            등록 하기
          </Button>
          <Button variant="outlined">뒤로 가기</Button>
        </div>
      </Form>
    </CreateBoardComponent>
  );
};
const category = {
  db: {
    title: 'db',
    kor: '데이터 베이스',
  },
  mobile: {
    title: 'mobile',
    kor: '모바일',
  },
  web: {
    title: 'web',
    kor: '웹',
  },
  language: {
    title: 'language',
    kor: '프로그래밍 언어',
  },
};
const types = [
  { title: 'c', kor: 'C' },
  { title: 'cp', kor: 'C++' },
  { title: 'java', kor: '자바' },
  { title: 'javascript', kor: '자바스크립트' },
  { title: 'html', kor: 'HTML' },
  { title: 'css', kor: 'CSS' },
  { title: 'swift', kor: '스위프트' },
  { title: 'python', kor: '파이썬' },
  { title: 'kotilin', kor: '코틀린' },
  { title: 'ruby', kor: 'Ruby' },
  { title: 'objectc', kor: '오브젝트-C' },
  { title: 'spring', kor: '스프링' },
  { title: 'nodejs', kor: 'node-js' },
  { title: 'django', kor: 'node-js' },
  { title: 'php', kor: 'php' },
  { title: 'rubyon', kor: 'ruby on rails' },
  { title: 'reactn', kor: '리액트네이티브' },
  { title: 'react', kor: '리액트' },
  { title: 'vue', kor: '뷰' },
  { title: 'anguler', kor: '앵귤러' },
  { title: 'svelet', kor: '스벨트' },
  { title: 'jdbc', kor: 'JDBC' },
  { title: 'mybatis', kor: 'myBatis' },
  { title: 'jpa', kor: 'JPA' },
  { title: 'rdb', kor: '관계형 DB' },
  { title: 'nosql', kor: 'NoSQL' },
  { title: 'mysql', kor: 'MySQL' },
  { title: 'oracle', kor: '오라클 DB' },
];
export default withRouter(CreateBoard);
