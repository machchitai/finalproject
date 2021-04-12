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
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedOrderIds;

    if (event.target.checked) {
      newSelectedOrderIds = orders.map((order) => order.id);
    } else {
      newSelectedOrderIds = [];
    }

    setSelectedOrderIds(newSelectedOrderIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedOrderIds.indexOf(id);
    let newSelectedOrderIds = [];

    if (selectedIndex === -1) {
      newSelectedOrderIds = newSelectedOrderIds.concat(selectedOrderIds, id);
    } else if (selectedIndex === 0) {
      newSelectedOrderIds = newSelectedOrderIds.concat(selectedOrderIds.slice(1));
    } else if (selectedIndex === selectedOrderIds.length - 1) {
      newSelectedOrderIds = newSelectedOrderIds.concat(selectedOrderIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedOrderIds = newSelectedOrderIds.concat(
        selectedOrderIds.slice(0, selectedIndex),
        selectedOrderIds.slice(selectedIndex + 1)
      );
    }

    setSelectedOrderIds(newSelectedOrderIds);
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
                    checked={selectedOrderIds.length === orders.length}
                    color="primary"
                    indeterminate={
                      selectedOrderIds.length > 0
                      && selectedOrderIds.length < orders.length
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
              {orders.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                  selected={selectedOrderIds.indexOf(order.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedOrderIds.indexOf(order.id) !== -1}
                      onChange={(event) => handleSelectOne(event, order.id)}
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
                      {order.receiver_full_name}
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
                          {`- Product: ${product.product_name} 
                          - Quantity: ${product.quantity} 
                          - Price: ${product.price} 
                          - Total: ${product.total}`}
                        </div>
                      );
                    })}
                    <div>
                      Sum:
                      {order.sum}
                    </div>
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
  orders: PropTypes.array.isRequired
};

export default Results;
