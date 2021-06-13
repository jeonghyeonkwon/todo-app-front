import React from 'react';
import styled from 'styled-components';
import {
  TextField,
  Chip,
  makeStyles,
  Button,
  Checkbox,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { withRouter } from 'react-router-dom';

import { types } from '../../data/skillTypes';
import { boardTitle } from '../../data/menuData';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

const type = {
  qna: 'Q&A',
  study: '스터디',
};
const CreateBoard = ({
  boardType,
  skill,
  form,
  onChange,
  onChangeType,
  onSubmit,
  onClickBack,
}) => {
  const classes = useStyles();

  return (
    <>
      <Form className={classes.root}>
        <h1>
          {type[boardType]} 게시 글 작성 ({boardTitle[skill]})
        </h1>
        <TextField
          label="제목"
          fullWidth
          onChange={onChange}
          name="title"
          value={form.title}
        />
        {boardType === 'study' && (
          <TextField
            label="모집 인원"
            type="number"
            min="0"
            onChange={onChange}
            name="applicant"
            value={form.applicant}
          />
        )}
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={types}
          value={form.programmingType}
          disableCloseOnSelect
          onChange={onChangeType}
          limitTags={2}
          getOptionLabel={(option) => option.kor}
          renderOption={(option, { selected }) => {
            return (
              <>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.kor}
              </>
            );
          }}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="기술 유형"
              placeholder="기술 유형 1~2 가지를 선택하세요"
            />
          )}
        />
        {/* <Autocomplete
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
                  return skill.indexOf(option) === -1;
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
                disabled={skill.indexOf(option) !== -1}
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
        /> */}
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
          <Button variant="outlined" onCLick={onClickBack}>
            뒤로 가기
          </Button>
        </div>
      </Form>
    </>
  );
};

export default withRouter(CreateBoard);
