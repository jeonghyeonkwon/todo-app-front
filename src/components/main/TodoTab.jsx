import React from 'react';
import styled from 'styled-components';
import {
  AppBar,
  Tabs,
  Tab,
  makeStyles,
  useTheme,
  Box,
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import Loading from '../common/Loading';
const CardAlign = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-around;

  flex-wrap: wrap;
`;
const TodoTabComponent = styled.div`
  width: 100%;
`;
function allyProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

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
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
const TodoTab = ({ children, setting, onChangeTab, loading }) => {
  return (
    <TodoTabComponent>
      <AppBar position="static" color="default">
        <Tabs
          value={setting.tab}
          onChange={onChangeTab}
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
        <Loading />
      ) : (
        <TabPanel style={{ width: '100%' }}>
          <CardAlign>{children}</CardAlign>
        </TabPanel>
      )}
    </TodoTabComponent>
  );
};

export default TodoTab;
