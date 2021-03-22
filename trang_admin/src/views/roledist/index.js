import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import Page from 'src/components/Page';
import RoleList from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RoleDist = () => {
  const classes = useStyles();
  const [rolelist, setRoleList] = useState([]);
  const [menuadmin, setMenuAdmin] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/distribute-role')
      .then((results) => {
        setRoleList(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get('http://localhost:4000/menu-admin')
      .then((results) => {
        setMenuAdmin(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Page
      className={classes.root}
      title="List"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <RoleList rolelists={rolelist} menuadminlist={menuadmin} />
        </Box>
      </Container>
    </Page>
  );
};

export default RoleDist;
