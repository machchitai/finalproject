import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Page from 'src/components/Page';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const FormUserEdit = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const param = useParams();
  const [productInfo, setProductInfo] = useState({
    categoryid: '',
    name: '',
    description: '',
    price: '',
    vendor: '',
    color: '',
    size: '',
    quantity: ''
  });

  const [typeError, setTypeError] = useState('');
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    console.log(param);
    axios.get(`http://localhost:4000/products/${param.id_product}`)
      .then((response) => {
        console.log(response);
        setProductInfo(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(productInfo);
    axios.put(`http://localhost:4000/products/${param.id_product}`, productInfo)
      .then((data) => {
        console.log(data);
        setTypeError('success');
        setMessageError('Update successful!');
        setTimeout(() => {
          navigate('/app/product-management', { replace: true });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setTypeError('error');
        setMessageError('Update failed!');
      });
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Page
      className={classes.root}
      title="Edit User"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          {typeError}
          {messageError}
          {
            (typeError && messageError) ? <Alert severity={typeError}>{messageError}</Alert> : <></>
          }
          <Formik>
            {({
              errors,
              handleBlur,
              isSubmitting,
              touched
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Update product info
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.categoryid && errors.categoryid)}
                  fullWidth
                  helperText={touched.categoryid && errors.categoryid}
                  label="Product category"
                  margin="normal"
                  name="categoryid"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={productInfo.categoryid}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Product name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={productInfo.name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.description && errors.description)}
                  fullWidth
                  helperText={touched.description && errors.description}
                  label="Description"
                  margin="normal"
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={productInfo.description}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.price && errors.price)}
                  fullWidth
                  helperText={touched.price && errors.price}
                  label="Price"
                  margin="normal"
                  name="price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={productInfo.price}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.vendor && errors.vendor)}
                  fullWidth
                  helperText={touched.vendor && errors.vendor}
                  label="Vendor"
                  margin="normal"
                  name="vendor"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="vendor"
                  value={productInfo.vendor}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.color && errors.color)}
                  fullWidth
                  helperText={touched.color && errors.color}
                  label="Color"
                  margin="normal"
                  name="color"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={productInfo.color}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.size && errors.size)}
                  fullWidth
                  helperText={touched.size && errors.size}
                  label="Size"
                  margin="normal"
                  name="size"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={productInfo.size}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.quantity && errors.quantity)}
                  fullWidth
                  helperText={touched.quantity && errors.quantity}
                  label="Quantity"
                  margin="normal"
                  name="quantity"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={productInfo.quantity}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Update now
                  </Button>
                </Box>
                <Link to="/app/product-management/">
                  <Box my={2}>
                    <Button
                      color="secondary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Cancel
                    </Button>
                  </Box>
                </Link>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default FormUserEdit;
