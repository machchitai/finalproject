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

const Results = ({ className, products, ...rest }) => {
  const classes = useStyles();
  const [selectedproductIds, setSelectedproductIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [productIdCurrent, setproductIdCurrent] = useState('');

  const handleSelectAll = (event) => {
    let newSelectedproductIds;

    if (event.target.checked) {
      newSelectedproductIds = products.map((product) => product.id);
    } else {
      newSelectedproductIds = [];
    }

    setSelectedproductIds(newSelectedproductIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedproductIds.indexOf(id);
    let newSelectedproductIds = [];

    if (selectedIndex === -1) {
      newSelectedproductIds = newSelectedproductIds.concat(selectedproductIds, id);
    } else if (selectedIndex === 0) {
      newSelectedproductIds = newSelectedproductIds.concat(selectedproductIds.slice(1));
    } else if (selectedIndex === selectedproductIds.length - 1) {
      newSelectedproductIds = newSelectedproductIds.concat(selectedproductIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedproductIds = newSelectedproductIds.concat(
        selectedproductIds.slice(0, selectedIndex),
        selectedproductIds.slice(selectedIndex + 1)
      );
    }

    setSelectedproductIds(newSelectedproductIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (idproduct) => {
    setOpen(true);
    setproductIdCurrent(idproduct);
  };

  const handleDeleteproduct = (idproduct) => {
    console.log(idproduct);
    handleClickOpen(idproduct);
  };

  const handleSendRequestDeleteProduct = () => {
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

  const handleRemoveproductSelected = () => {
    console.log('delete product');
    console.log(selectedproductIds);

    axios.delete('http://localhost:4000/products', {
      auth: {
        username: 'machchitai',
        password: '123456'
      },
      data: selectedproductIds
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
      <Button autoFocus onClick={handleRemoveproductSelected} color="secondary">
        Delete Selected
      </Button>
      <PerfectScrollbar>

        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogActions>
            <Button autoFocus onClick={handleSendRequestDeleteProduct} color="secondary">
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
                    checked={selectedproductIds.length === products.length}
                    color="primary"
                    indeterminate={
                      selectedproductIds.length > 0
                      && selectedproductIds.length < products.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
                <TableCell>
                  Vendor
                </TableCell>
                <TableCell>
                  Color
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
              {products.slice(0, limit).map((product) => (
                <TableRow
                  hover
                  key={product.id}
                  selected={selectedproductIds.indexOf(product.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedproductIds.indexOf(product.id) !== -1}
                      onChange={(event) => handleSelectOne(event, product.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {product.name}
                  </TableCell>
                  <TableCell>
                    {product.description}
                  </TableCell>
                  <TableCell>
                    {product.price}
                  </TableCell>
                  <TableCell>
                    {product.vendor}
                  </TableCell>
                  <TableCell>
                    {product.color}
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
                    <Button variant="contained" color="secondary" style={{ background: '#e23f0e' }} onClick={() => { handleDeleteproduct(product.id); }}>
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
        count={products.length}
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
  products: PropTypes.array.isRequired
};

export default Results;
