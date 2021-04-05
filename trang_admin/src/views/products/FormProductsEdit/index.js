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
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={productInfo.name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={productInfo.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={productInfo.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={productInfo.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.id_role && errors.id_role)}
                  fullWidth
                  helperText={touched.id_role && errors.id_role}
                  label="RoleID"
                  margin="normal"
                  name="id_role"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={productInfo.id_role}
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
                <Link to="/app/product_management/">
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
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
