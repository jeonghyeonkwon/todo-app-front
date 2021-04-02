import React, { useCallback, useEffect, useState } from 'react';
import styled, { ThemeConsumer } from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import {
  AppBar,
  Tabs,
  Tab,
  makeStyles,
  useTheme,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Modal,
  Fade,
  Backdrop,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import StyledModal from '../common/StyledModal';
import StyledCard from '../common/StyledCard';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Loading from '../common/Loading';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    width: 500,
    padding: theme.spacing(2, 4, 3),
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          style={{
            border: '2px solid yellowgreen',
          }}
          p={3}
        >
          {children}
        </Box>
      )}
    </div>
  );
}
function allyProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const MyTodoComponent = styled.div`
  flex: 4;
  border: 1px solid red;
  background: #fff;
`;
const MyTodo = ({ history }) => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [cardId, setCardId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [data, setData] = useState({});
  const theme = useTheme();

  const classes = useStyles();
  // 탭 액션
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  // //모달 액션
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  useEffect(() => {
    const todoList = async (token) => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/todo`, {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token.replace(/\"/gi, '')}`,
          },
        });
        console.log(response);
        setList(response.data);
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
      todoList(token);
    } catch (e) {
      console.log('2');

      alert('내용에 문제가 있습니다. 다시 시도 해주세요');
      //history.push('/');
    }
  }, []);
  const handleOpen = useCallback((id, data) => {
    setOpen(true);
    setCardId(id);
    console.log(data);
    setData(data);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
    setCardId(0);
    setData({});
  }, []);
  useEffect(() => {
    console.log(`open ${open} card ${cardId}`);
  }, [open, cardId]);
  return (
    <MyTodoComponent>
      {open && (
        <StyledModal
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
          cardId={cardId}
          data={data}
        ></StyledModal>
      )}

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab label="진행중" {...allyProps(0)} />
          <Tab label="실패" {...allyProps(1)} />
          <Tab label="성공" {...allyProps(2)} />
        </Tabs>
      </AppBar>
      {loading ? (
        <Loading></Loading>
      ) : (
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <StyledCard handleOpen={handleOpen}></StyledCard>
            {list
              .filter(
                (data) => data.status === 'expected' || data.status === 'today',
              )
              .map((card) => (
                <StyledCard
                  data={card}
                  status={card.status}
                  handleClose={handleClose}
                  kind
                  handleOpen={handleOpen}
                ></StyledCard>
              ))}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {list
              .filter((data) => data.status === 'failure')
              .map((card) => (
                <StyledCard
                  data={card}
                  status={card.status}
                  handleClose={handleClose}
                  kind
                  handleOpen={handleOpen}
                ></StyledCard>
              ))}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            {list
              .filter((data) => data.status === 'achieve')
              .map((card) => (
                <StyledCard
                  data={card}
                  status={card.status}
                  handleClose={handleClose}
                  kind
                  handleOpen={handleOpen}
                ></StyledCard>
              ))}
          </TabPanel>
        </SwipeableViews>
      )}
    </MyTodoComponent>
  );
};

export const cardData = [
  {
    id: 12,
    title: '리액트 공부해요',
    contents:
      '리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.',
    status: 'proceeding',
    goal: '2021-02-25',
  },
  {
    id: 2,
    title: '리액트6요',
    contents:
      '리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.',
    status: 'fail',
    goal: '2001-03-25',
  },
  {
    id: 152,
    title: '리액트 공요',
    contents: '앵귤러 공부합',
    status: 'success',
    goal: '2091-03-25',
  },
  {
    id: 17772,
    title: '공부해요',
    contents: '15asdknlxcvknzeozmdlkfnasldkntlknwelkrtl',
    status: 'proceeding',
    goal: '2028-03-25',
  },
  {
    id: 12664,
    title: '리액트 공부해요',
    contents:
      'system.out.println(나이나맹sdkfnaslkrenasdfbnkasdbfklsjadbfkljbsadkjfbkasjdbfkjsabdkfjbsadkjflkjbll)',
    status: 'proceeding',
    goal: '2071-03-25',
  },
  {
    id: 15552,
    title: '뷰 공부해요',
    contents:
      '리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.',
    status: 'fail',
    goal: '2141-03-25',
  },
  {
    id: 1234,
    title: '리요',
    contents:
      '리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.리액트 모집합니다.',
    status: 'proceeding',
    goal: '2052-03-25',
  },
  {
    id: 12352,
    title: '리액트 공부해요',
    contents: '리',
    status: 'success',
    goal: '2221-03-25',
  },
];
export default withRouter(MyTodo);
