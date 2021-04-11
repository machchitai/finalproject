import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, users, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [userIdCurrent, setUserIdCurrent] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (idUser) => {
    setOpen(true);
    setUserIdCurrent(idUser);
  };

  const handleDeleteUser = (idUser) => {
    console.log(idUser);
    handleClickOpen(idUser);
  };

  const handleDeleteOneUser = () => {
    axios.delete(`http://localhost:4000/user/${userIdCurrent}`, {
      auth: {
        username: 'machchitai',
        password: '123456'
      }
    })
      .then((response) => {
        console.log(response);
        rest.handleChangeComponent();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">ALERT</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are going to delete selected users permanently. Are you sure about this?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleDeleteOneUser} color="secondary">
              OK
            </Button>
            <Button autoFocus onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Password
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  RoleID
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow>
                  <TableCell>
                    {user.name}
                  </TableCell>
                  <TableCell>
                    {user.username}
                  </TableCell>
                  <TableCell>
                    {user.password}
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {user.id_role}
                  </TableCell>
                  <TableCell>
                    <Link to={`/app/users/${user.id}`}>
                      <Button variant="contained" color="primary">
                        <EditIcon />
                      </Button>
                    </Link>
                    <Button variant="contained" color="secondary" style={{ background: '#e23f0e' }} onClick={() => { handleDeleteUser(user.id); }}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default Results;
