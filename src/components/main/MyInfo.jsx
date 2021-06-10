import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Loading from '../common/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    fontWeight: 'bold',
    fontSize: '24px',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  withdrawal: {
    color: 'red',
  },
  textField: {
    margin: '5px 0px 10px 0px',
    width: '30%',
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'left',
  },
  button: {
    width: '20%',
    margin: 'auto',
  },
  formControl: {
    margin: '5px 0px 10px 0px',
    width: '30%',
  },
}));

const MyInfoComponent = styled.div`
  padding: 20px;
  flex: 4;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
`;
const MyInfo = ({
  local,
  info,
  loading,
  expanded,
  onChangePanel,
  handleChangeForm,
  form,
  onClickUpdate,
  onClickDelete,
}) => {
  const classes = useStyles();

  return (
    <MyInfoComponent>
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={onChangePanel('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>아이디</Typography>
              <Typography className={classes.secondaryHeading}>
                {info.accountId}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.detail}>
              <Typography>아이디는 변경할수 없습니다.</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={onChangePanel('panel2')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}>비밀번호 변경</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.detail}>
              <TextField
                label="현재 비밀번호"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                className={classes.textField}
                value={form.currentPw}
                name="currentPw"
                onChange={handleChangeForm}
              />
              <TextField
                label="새로운 비밀번호"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                className={classes.textField}
                value={form.newPw}
                name="newPw"
                onChange={handleChangeForm}
              />
              <TextField
                label="새로운 비밀번호 재입력"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                className={classes.textField}
                value={form.reNewPw}
                name="reNewPw"
                onChange={handleChangeForm}
              />
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={(e) => onClickUpdate(e, 'password')}
              >
                수정하기
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={onChangePanel('panel3')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography className={classes.heading}>성명</Typography>
              <Typography className={classes.secondaryHeading}>
                {info.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.detail}>
              <TextField
                label="개명할 이름"
                type="text"
                variant="outlined"
                className={classes.textField}
                value={form.name}
                name="name"
                onChange={handleChangeForm}
              />
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={(e) => onClickUpdate(e, 'name')}
              >
                수정하기
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel4'}
            onChange={onChangePanel('panel4')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography className={classes.heading}>전화번호</Typography>
              <Typography className={classes.secondaryHeading}>
                {info.tel}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.detail}>
              <TextField
                label="바뀐 전화번호"
                type="text"
                variant="outlined"
                className={classes.textField}
                value={form.tel}
                name="tel"
                onChange={handleChangeForm}
              />
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={(e) => onClickUpdate(e, 'tel')}
              >
                수정하기
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel5'}
            onChange={onChangePanel('panel5')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5bh-content"
              id="panel5bh-header"
            >
              <Typography className={classes.heading}>지역</Typography>
              <Typography className={classes.secondaryHeading}>
                {info.location}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.detail}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">지역</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={info.local}
                  name="local"
                  onChange={handleChangeForm}
                >
                  {local
                    .filter((x) => x.kor !== '전체')
                    .map((data) => (
                      <MenuItem key={data.eng} value={data.kor}>
                        {data.kor}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={(e) => onClickUpdate(e, 'local')}
              >
                수정하기
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel6'}
            onChange={onChangePanel('panel6')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel6bh-content"
              id="panel6bh-header"
            >
              <Typography className={clsx(classes.heading, classes.withdrawal)}>
                탈퇴하기
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.detail}>
              <TextField
                label="현재 비밀번호"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                className={classes.textField}
                value={form.withDrawalPw}
                name="withDrawalPw"
                onChange={handleChangeForm}
              />
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={onClickDelete}
              >
                탈퇴하기
              </Button>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </MyInfoComponent>
  );
};

export default MyInfo;
