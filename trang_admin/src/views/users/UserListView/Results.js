import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Dialog,
  DialogActions,
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
  const [selecteduserIds, setSelecteduserIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [userIdCurrent, setUserIdCurrent] = useState('');

  const handleSelectAll = (event) => {
    let newSelecteduserIds;

    if (event.target.checked) {
      newSelecteduserIds = users.map((user) => user.id);
    } else {
      newSelecteduserIds = [];
    }

    setSelecteduserIds(newSelecteduserIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selecteduserIds.indexOf(id);
    let newSelecteduserIds = [];

    if (selectedIndex === -1) {
      newSelecteduserIds = newSelecteduserIds.concat(selecteduserIds, id);
    } else if (selectedIndex === 0) {
      newSelecteduserIds = newSelecteduserIds.concat(selecteduserIds.slice(1));
    } else if (selectedIndex === selecteduserIds.length - 1) {
      newSelecteduserIds = newSelecteduserIds.concat(selecteduserIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelecteduserIds = newSelecteduserIds.concat(
        selecteduserIds.slice(0, selectedIndex),
        selecteduserIds.slice(selectedIndex + 1)
      );
    }

    setSelecteduserIds(newSelecteduserIds);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

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

  const handleSendRequestDeleteUser = () => {
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

  const handleRemoveUserSelected = () => {
    console.log('delete user');
    console.log(selecteduserIds);

    axios.delete('http://localhost:4000/user', {
      auth: {
        username: 'machchitai',
        password: '123456'
      },
      data: selecteduserIds
    })
      .then((response) => {
        console.log(response);
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
      <Button autoFocus onClick={handleRemoveUserSelected} color="secondary">
        Delete Selected
      </Button>
      <PerfectScrollbar>

        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogActions>
            <Button autoFocus onClick={handleSendRequestDeleteUser} color="secondary">
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
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selecteduserIds.length === users.length}
                    color="primary"
                    indeterminate={
                      selecteduserIds.length > 0
                      && selecteduserIds.length < users.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, limit).map((user) => (
                <TableRow
                  hover
                  key={user.id}
                  selected={selecteduserIds.indexOf(user.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selecteduserIds.indexOf(user.id) !== -1}
                      onChange={(event) => handleSelectOne(event, user.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {user.name}
                  </TableCell>
                  <TableCell>
                    {user.username}
                  </TableCell>
                  <TableCell>
                    {user.email}
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
      <TablePagination
        component="div"
        count={users.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default Results;
