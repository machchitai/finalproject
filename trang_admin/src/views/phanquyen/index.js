import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import Page from 'src/components/Page';
import DanhSachPhanQuyen from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [dsphanquyen, setDsPhanQuyen] = useState([]);
  const [menuquantri, setMenuQuanTri] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/phan-quyen')
      .then((results) => {
        setDsPhanQuyen(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get('http://localhost:4000/menu-quan-tri')
      .then((results) => {
        setMenuQuanTri(results.data);
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
          <DanhSachPhanQuyen danhsachphanquyen={dsphanquyen} dsmenuquantri={menuquantri} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
