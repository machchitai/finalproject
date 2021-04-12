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
import UserList from './Results';

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
  const [userid, setUserID] = useState('');
  const [userlist, setUserList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userid.length) {
      axios.get(`http://localhost:4000/user/search/${userid}`)
        .then((response) => {
          console.log(response);
          setUserList(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('Please insert user ID!');
    }
  };

  const handleChange = (e) => {
    setUserID(e.target.value);
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
        <Link to="/app/users/add">
          <Button
            color="primary"
            variant="contained"
          >
            Add User
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
                  label="User ID"
                  margin="normal"
                  name="userid"
                  onChange={handleChange}
                  value={userid}
                  variant="outlined"
                />
                <UserList users={userlist} />
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
