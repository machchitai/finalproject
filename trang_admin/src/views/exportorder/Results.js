import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
  makeStyles
} from '@material-ui/core';
// import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, orders, ...rest }) => {
  const classes = useStyles();
  const [selectedorderIds, setSelectedorderIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedorderIds;

    if (event.target.checked) {
      newSelectedorderIds = orders.map((order) => order.ma);
    } else {
      newSelectedorderIds = [];
    }

    setSelectedorderIds(newSelectedorderIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedorderIds.indexOf(id);
    let newSelectedorderIds = [];

    if (selectedIndex === -1) {
      newSelectedorderIds = newSelectedorderIds.concat(selectedorderIds, id);
    } else if (selectedIndex === 0) {
      newSelectedorderIds = newSelectedorderIds.concat(selectedorderIds.slice(1));
    } else if (selectedIndex === selectedorderIds.length - 1) {
      newSelectedorderIds = newSelectedorderIds.concat(selectedorderIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedorderIds = newSelectedorderIds.concat(
        selectedorderIds.slice(0, selectedIndex),
        selectedorderIds.slice(selectedIndex + 1)
      );
    }

    setSelectedorderIds(newSelectedorderIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
                    checked={selectedorderIds.length === orders.length}
                    color="primary"
                    indeterminate={
                      selectedorderIds.length > 0
                      && selectedorderIds.length < orders.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Order ID
                </TableCell>
                <TableCell>
                  User Info
                </TableCell>
                <TableCell>
                  Products Bought
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.slice(0, limit).map((order) => (
                <TableRow
                  hover
                  key={order.ma}
                  selected={selectedorderIds.indexOf(order.ma) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedorderIds.indexOf(order.ma) !== -1}
                      onChange={(event) => handleSelectOne(event, order.ma)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      {order.id_export_order}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <div>
                      Name:
                      {order.receiver_name}
                    </div>
                    <div>
                      Email:
                      {order.email}
                    </div>
                    <div>
                      Phone:
                      {order.receiver_phone}
                    </div>
                    <div>
                      Address:
                      {order.receiver_address}
                    </div>
                  </TableCell>
                  <TableCell>
                    {order.product_list.map((product) => {
                      return (
                        <div>
                          {`${product.name} - ${product.quantity} - ${product.price} - ${product.total}`}
                        </div>
                      );
                    })}
                    <div>{order.sum}</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={orders.length}
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
  orders: PropTypes.array.isRequired
};

export default Results;
