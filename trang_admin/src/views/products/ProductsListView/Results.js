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

const Results = ({ className, products, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [productIdCurrent, setProductIdCurrent] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (idProduct) => {
    setOpen(true);
    setProductIdCurrent(idProduct);
  };

  const handleDeleteProduct = (idProduct) => {
    console.log(idProduct);
    handleClickOpen(idProduct);
  };

  const handleDeleteOneProduct = () => {
    axios.delete(`http://localhost:4000/products/${productIdCurrent}`, {
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
              You are going to delete this product permanently. Are you sure about this?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleDeleteOneProduct} color="secondary">
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
                  Price
                </TableCell>
                <TableCell>
                  Vendor
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Color
                </TableCell>
                <TableCell>
                  Related Color
                </TableCell>
                <TableCell>
                  Size
                </TableCell>
                <TableCell>
                  Quantity
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow>
                  <TableCell>
                    {product.name}
                  </TableCell>
                  <TableCell>
                    {product.price}
                  </TableCell>
                  <TableCell>
                    {product.vendor}
                  </TableCell>
                  <TableCell>
                    {product.description}
                  </TableCell>
                  <TableCell>
                    {product.color}
                  </TableCell>
                  <TableCell>
                    {product.related_color}
                  </TableCell>
                  <TableCell>
                    {product.size}
                  </TableCell>
                  <TableCell>
                    {product.quantity}
                  </TableCell>
                  <TableCell>
                    <Link to={`/app/product-management/${product.id}`}>
                      <Button variant="contained" color="primary">
                        <EditIcon />
                      </Button>
                    </Link>
                    <Button variant="contained" color="secondary" style={{ background: '#e23f0e' }} onClick={() => { handleDeleteProduct(product.id); }}>
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
  products: PropTypes.array.isRequired
};

export default Results;
