import React from 'react';

import formatNumber from '~/util/formatNumber';

import './styles.css';

export default function TableSession({ table, onClick }) {
  /*
    Currently, this component only receives the table number and the timestamp of the order.
    In the near future, it should receive a list of orders for a given table, and expand (or open modal) to reveal all the information
  */
  const date = new Date(table.Timestamp);

  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`;
  const formattedTime = `${hours}:${minutes.substr(-2)}`;

  return (
    <button type="button" id="table-session-component" onClick={onClick}>
      <span>Mesa {formatNumber(table.TableNumber)}</span>

      <span>
        {table.loading ? (
          <div className="table-session-loader-container">
            <div className="table-session-loader" />
          </div>
        ) : (
          formattedTime
        )}
      </span>
    </button>
  );
}
