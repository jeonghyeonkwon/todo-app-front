import React, { useCallback, useEffect, useState } from 'react';
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
import axios from 'axios';
import { withRouter } from 'react-router-dom';
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
const MyInfo = ({ history }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    currentPw: '',
    newPw: '',
    reNewPw: '',
    name: '',
    responseData: [],
    local: '',
    withDrawalPw: '',
  });
  const [account, setAccount] = useState({
    id: 0,
    accountId: '',
    tel: '',
    location: '',
    name: '',
  });
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const onClickUpdate = async (event, updateName) => {
    event.preventDefault();

    const { currentPw, newPw, reNewPw, name, tel, local } = form;
    switch (updateName) {
      case 'password':
        if (!currentPw || !newPw || !reNewPw) {
          alert('빈 공간을 채워주세요');
          return;
        }

        if (newPw !== reNewPw) {
          alert('새로운 비밀번호와 새로운 비밀번호가 일치하지 않습니다.');
          return;
        }
        break;
      case 'name':
        if (!name) {
          alert('빈 공간을 채워주세요');
          return;
        }
        break;
      case 'tel':
        if (!tel) {
          alert('빈 공간을 채워주세요');
          return;
        }
        break;
      case 'local':
        if (!local) {
          alert('지역을 채워주세요');
          return;
        }
        break;
    }
    const updateUser = (token) =>
      axios.patch(
        `http://localhost:8080/api/myinfo/${account.id}?update=${updateName}`,
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
      console.log(`token ${token}`);
      await updateUser(token)
        .then((res) => {
          if (res.status === 204) {
            alert('회원 정보 수정에 완료하였습니다.');
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
      alert('내용에 문제가 있습니다. 다시 시도 해주세요');
      //history.push('/');
    } finally {
      window.location.reload();
    }
  };
  const deleteUser = async (e) => {
    e.preventDefault();
    const { withDrawalPw } = form;
    if (!withDrawalPw) {
      alert('내용을 채워주세요.');
      return;
    }
    const deleteUser = (token) =>
      axios.delete(`http://localhost:8080/api/myinfo/${account.id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token.replace(/\"/gi, '')}`,
        },
        data: { withDrawalPw },
        withCredentials: true,
      });

    try {
      const token = localStorage.getItem('jwttoken');
      console.log(`token ${token}`);
      await deleteUser(token)
        .then((res) => {
          if (res.status === 204) {
            alert('회원 탈퇴를 완료하였습니다. 감사합니다.');
            history.push('/');
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log('2');

      alert('내용에 문제가 있습니다. 다시 시도 해주세요');
      //history.push('/');
    }
  };
  useEffect(() => {
    setForm({
      ...form,
      currentPw: '',
      newPw: '',
      reNewPw: '',
      tel: '',
      name: '',
      local: '',
      withDrawalPw: '',
    });
  }, [expanded]);
  const handleChangeForm = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };
  useEffect(() => {
    const fetchLocal = async (token) => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/myinfo`, {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token.replace(/\"/gi, '')}`,
          },
        });
        console.log(response);
        setForm({ ...form, responseData: response.data.local });
        setAccount(response.data.account);
      } catch (e) {
        console.log(`${e} 함수 안`);
        alert(e);
        //alert('내용에 문제가 있습니다. 다시 시도 해주세요');
        //history.push('/');
      }
      setLoading(false);
    };
    try {
      const token = localStorage.getItem('jwttoken');
      console.log(`token ${token}`);
      fetchLocal(token);
    } catch (e) {
      console.log('2');

      alert('내용에 문제가 있습니다. 다시 시도 해주세요');
      //history.push('/');
    }
  }, []);
  return (
    <MyInfoComponent>
      {loading && account.id ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>아이디</Typography>
              <Typography className={classes.secondaryHeading}>
                {account.accountId}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.detail}>
              <Typography>아이디는 변경할수 없습니다.</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
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
            onChange={handleChange('panel3')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography className={classes.heading}>성명</Typography>
              <Typography className={classes.secondaryHeading}>
                {account.name}
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
            onChange={handleChange('panel4')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography className={classes.heading}>전화번호</Typography>
              <Typography className={classes.secondaryHeading}>
                {account.tel}
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
            onChange={handleChange('panel5')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5bh-content"
              id="panel5bh-header"
            >
              <Typography className={classes.heading}>지역</Typography>
              <Typography className={classes.secondaryHeading}>
                {account.location}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.detail}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">지역</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.local}
                  name="local"
                  onChange={handleChangeForm}
                >
                  {form.responseData.map((data) => (
                    <MenuItem key={data} value={data}>
                      {data}
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
            onChange={handleChange('panel6')}
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
                onClick={deleteUser}
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

export default withRouter(MyInfo);
