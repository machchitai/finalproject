import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductList from './Results';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [productname, setProductName] = useState('');
  const [productlist, setProductList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productname.length) {
      axios.get(`http://localhost:4000/products/search/${productname}`)
        .then((response) => {
          console.log(response);
          setProductList(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('Please insert product name!');
    }
  };

  const handleChange = (e) => {
    setProductName(e.target.value);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Link to="/app/product-management/add">
          <Button
            color="primary"
            variant="contained"
          >
            Add Product
          </Button>
        </Link>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={1000}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Product name"
                  margin="normal"
                  name="productname"
                  onChange={handleChange}
                  value={productname}
                  variant="outlined"
                />
                <ProductList products={productlist} />
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
