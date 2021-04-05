import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'axios';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ProductManageListView = ({ ...rest }) => {
  const classes = useStyles();
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const arraytest = [
      {
        id: 2,
        alias: 'product-management',
        ten_menu: 'Product Management',
        type_menu: 'read'
      }
    ];

    let booleantest = false;
    for (let i = 0; i < arraytest.length; i++) {
      if (arraytest[i].alias === rest.alias) {
        console.log(arraytest[i].alias, rest.alias);
        booleantest = true;
        break;
      }
    }

    if (booleantest) {
      console.log('do nothing');
    } else {
      alert('You do not have permission');
    }

    axios.get('http://localhost:4000/products/')
      .then((response) => {
        console.log(response);
        setProduct(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results products={products} />
        </Box>
      </Container>
    </Page>
  );
};

export default ProductManageListView;
