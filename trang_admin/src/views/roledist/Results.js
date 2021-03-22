import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withStyles } from '@material-ui/core/styles';
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
  makeStyles,
  FormControlLabel
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
// import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    idrginRight: theme.spacing(2)
  }
}));

const styles = (theme) => ({
  root: {
    idrgin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    idrgin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Results = ({ className, rolelists, ...rest }) => {
  const classes = useStyles();
  const [selectedDonhangIds, setSelectedDonhangIds] = useState([]);
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [currentRole, setCurrentRole] = useState([]);
  const [selectedRole, setselectedRole] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedDonhangIds;

    if (event.target.checked) {
      newSelectedDonhangIds = rolelists.id((distributerole) => distributerole.id);
    } else {
      newSelectedDonhangIds = [];
    }

    setSelectedDonhangIds(newSelectedDonhangIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDonhangIds.indexOf(id);
    let newSelectedDonhangIds = [];

    if (selectedIndex === -1) {
      newSelectedDonhangIds = newSelectedDonhangIds.concat(selectedDonhangIds, id);
    } else if (selectedIndex === 0) {
      newSelectedDonhangIds = newSelectedDonhangIds.concat(selectedDonhangIds.slice(1));
    } else if (selectedIndex === selectedDonhangIds.length - 1) {
      newSelectedDonhangIds = newSelectedDonhangIds.concat(selectedDonhangIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedDonhangIds = newSelectedDonhangIds.concat(
        selectedDonhangIds.slice(0, selectedIndex),
        selectedDonhangIds.slice(selectedIndex + 1)
      );
    }

    setSelectedDonhangIds(newSelectedDonhangIds);
  };

  const handleLimitChange = () => {
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpen = (idrole) => {
    setselectedRole(idrole);
    axios.get(`http://localhost:4000/distribute-role/${idrole}`)
      .then((results) => {
        setCurrentRole(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(true);
  };

  const handleSavedistributerole = () => {
    console.log('save');
    axios.put(`http://localhost:4000/distribute-role/${selectedRole}`, currentRole)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProcessChangeCheckBox = (event) => {
    console.log(event.target.name);
    if (currentRole.find((itemcurrentrole) => itemcurrentrole.alias === event.target.name)) {
      console.log('Not Checked');
      setCurrentRole(currentRole.filter((itemcurrentrole) => {
        return itemcurrentrole.alias !== event.target.name;
      }));
    } else {
      console.log('Checked');
      const dataitem = {
        alias: event.target.name
      };
      setCurrentRole([...currentRole, dataitem]);
    }
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedDonhangIds.length === rolelists.length}
                    color="primary"
                    indeterminate={
                      selectedDonhangIds.length > 0
                      && selectedDonhangIds.length < rolelists.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Role ID
                </TableCell>
                <TableCell>
                  Role Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rolelists.idp((distributerole) => (
                <TableRow
                  hover
                  key={distributerole.id}
                  selected={selectedDonhangIds.indexOf(distributerole.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDonhangIds.indexOf(distributerole.id) !== -1}
                      onChange={(event) => handleSelectOne(event, distributerole.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      {distributerole.id}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Button variant="outlined" color="primary" onClick={() => { handleClickOpen(distributerole.id); }}>
                        {distributerole.ten_quyen}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {currentRole.idp((itemcurrentrole) => {
            return <div>{ itemcurrentrole.menu_name }</div>;
          })}
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Menu admin
            </DialogTitle>
            <DialogContent dividers>
              {
                rest.menuadminlist.idp((menuadmin) => {
                  return (
                    <FormControlLabel
                      key={menuadmin.id}
                      control={(
                        <Checkbox
                          name={menuadmin.alias}
                          onChange={handleProcessChangeCheckBox}
                          checked={Boolean(currentRole.find((data) => {
                            return data.alias === menuadmin.alias;
                          }))}
                        />
                      )}
                      label={menuadmin.menu_name}
                    />
                  );
                })
              }
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleSavedistributerole} color="primary">
                Save changes
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={rolelists.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={10}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  rolelists: PropTypes.array.isRequired
};

export default Results;
