import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const [userInfo, setUserInfo] = useState({
    name: '',
    username: '',
    password: '',
    email: ''
  });

  const [typeError, setTypeError] = useState('');
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    console.log(param);
    axios.get(`http://localhost:4000/user/${param.id_user}`)
      .then((reponse) => {
        console.log(reponse);
        setUserInfo(reponse.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userInfo);
    axios.put(`http://localhost:4000/user/${param.id_user}`, userInfo)
      .then((data) => {
        console.log(data);
        setTypeError('success');
        setMessageError('Update successful!');
        setTimeout(() => {
          navigate('/app/users', { replace: true });
        }, 10000);
      })
      .catch((err) => {
        console.log(err);
        setTypeError('error');
        setMessageError('Update failed!');
      });
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Page
      className={classes.root}
      title="Register"
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
                    Create new user
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Full name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={userInfo.name}
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
                  value={userInfo.username}
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
                  value={userInfo.email}
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
                  value={userInfo.password}
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
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default FormUserEdit;
