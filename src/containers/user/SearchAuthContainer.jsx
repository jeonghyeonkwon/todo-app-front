import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import SearchId from '../../components/main/SearchId';
import SearchPw from '../../components/main/SearchPw';
const SearchAuthContainer = ({ location }) => {
  const section = location.pathname.split('/')[2];

  useEffect(() => {
    console.log(`section ${section}`);
  }, []);
  return <>{section === 'searchId' ? <SearchId /> : <SearchPw />}</>;
};

export default withRouter(SearchAuthContainer);
