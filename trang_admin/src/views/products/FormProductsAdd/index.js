import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const FormProductsAdd = () => {
  const classes = useStyles();
  const navigate = useNavigate();
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    setIsSubmitting(true);
    event.preventDefault();
    console.log(productInfo);
    axios.post('http://localhost:4000/products/add', productInfo)
      .then((data) => {
        console.log(data);
        setTypeError('success');
        setMessageError('Add product successful!');
        setTimeout(() => {
          navigate('/app/product-management', { replace: true });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setTypeError('error');
        setMessageError('Add product failed!');
        setIsSubmitting(false);
        setTimeout(() => {
          navigate('/app/product-management', { replace: true });
        }, 1000);
      });
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleBackButton = () => {
    navigate('/app/users', { replace: true });
  };

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        // height="100%"
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
              touched
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Add new product
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
                  error={Boolean(touched.related_color && errors.related_color)}
                  fullWidth
                  helperText={touched.related_color && errors.related_color}
                  label="Related Color"
                  margin="normal"
                  name="relatedcolor"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={productInfo.related_color}
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
                    Add Product
                  </Button>
                </Box>
                <Box my={2}>
                  <Button
                    onClick={handleBackButton}
                    color="white"
                    fullWidth
                    size="large"
                    variant="contained"
                  >
                    Back
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default FormProductsAdd;
