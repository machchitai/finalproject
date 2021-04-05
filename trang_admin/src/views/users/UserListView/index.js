import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UserListView = () => {
  const classes = useStyles();

  const [listUsers, setListUsers] = useState([]);

  const [valueSearch, setValueSearch] = useState('');

  const [valueChange, setValueChange] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:4000/user/')
      .then((dataReponse) => {
        console.log(dataReponse.data);
        setListUsers(dataReponse.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [valueChange]);

  const handleChangeComponent = () => {
    setValueChange(valueChange + 1);
  };

  const handleProcessSearchValue = (e) => {
    setValueSearch(e.target.value);
  };

  return (
    <Page
      className={classes.root}
      title="Users"
    >
      <Container maxWidth={false}>
        <Toolbar processInput={handleProcessSearchValue} />
        {valueSearch}
        <Box mt={3}>
          <Results
            users={
              listUsers.filter((temp) => {
                return temp.username.indexOf(valueSearch) >= 0;
              })
            }
            handleChangeComponent={handleChangeComponent}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default UserListView;
