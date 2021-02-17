import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import waiterCallArchiveSchema from '~/json/waiter_call_archive_schema.json';
import billCallArchiveSchema from '~/json/bill_call_archive_schema.json';

import { archiveOrderSuccess, archiveOrderFailure } from './actions';

export function* archiveOrder({ payload }) {
  const order = payload;

  const value = {
    EstablishmentId: parseInt(order.EstablishmentId, 10),
    TableNumber: order.TableNumber,
  };

  let schema;
  let requestRoute;

  if (order.NotificationType === 'waiterCall') {
    schema = waiterCallArchiveSchema;
    value.WaiterCallTimestamp = order.Timestamp.toString();
    requestRoute = 'waiter-call';
  } else if (order.NotificationType === 'billCall') {
    schema = billCallArchiveSchema;
    value.BillCallTimestamp = order.Timestamp.toString();
    requestRoute = 'bill-call';
  }

  const data = {
    data: {
      value_schema: JSON.stringify(schema),
      records: [
        {
          value,
        },
      ],
    },
  };

  try {
    yield call(api.delete, requestRoute, data);

    yield put(archiveOrderSuccess(order));
  } catch (err) {
    yield put(archiveOrderFailure(order));

    alert(
      'Não foi possível arquivar esse pedido. Verifique sua conexão e tente novamente mais tarde.'
    );
  }
}

export default all([
  takeLatest('@dashboard/ARCHIVE_ORDER_REQUEST', archiveOrder),
]);
