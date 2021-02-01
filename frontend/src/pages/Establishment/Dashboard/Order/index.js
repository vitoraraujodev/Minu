import React from 'react';

import './styles.css';

export default function Order({ tableNumber, timestamp, onClick }) {
  /* 
    Currently, this component only receives the table number and the timestamp of the order.
    In the near future, it should receive a list of orders for a given table, and expand (or open modal) to reveal all the information
  */
  var date = new Date(timestamp);

  var hours = date.getHours(); 
  var minutes = "0" + date.getMinutes();

  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2);
  return (
    <button type="button" id="order-component" onClick={onClick}>
      <span>Mesa {tableNumber >= 0 && tableNumber <= 9 ? `0${tableNumber}` : tableNumber}</span>
      <span>{formattedTime}</span>
    </button>
  );
}
