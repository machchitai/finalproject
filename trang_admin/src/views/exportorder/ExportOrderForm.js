import React, { useState } from 'react';
import {
  TextField
} from '@material-ui/core';
import axios from 'axios';
import OrderList from './Results';

const ExportOrderForm = () => {
  const [orderid, setOrderId] = useState('');
  const [orderlist, setOrderList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderid.length) {
      axios.get(`http://localhost:4000/orders/search/${orderid}`)
        .then((response) => {
          console.log(response);
          setOrderList(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('Please insert order ID!');
    }
  };

  const handleChange = (e) => {
    setOrderId(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          helperText="Order ID"
          label="Order ID"
          margin="normal"
          name="orderid"
          onChange={handleChange}
          value={orderid}
          variant="outlined"
        />
        <OrderList orders={orderlist} />
        <button
          type="submit"
          style={{
            padding: '5px',
            margin: '10px',
            borderRadius: '5px',
            border: 'solid 1px black',
            width: '100px'
          }}
          className="btn btn-primary"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default ExportOrderForm;
