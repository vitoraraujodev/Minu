import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import waiterCallArchiveSchema from '~/json/waiter_call.json';

import { archiveOrderSuccess, archiveOrderFailure } from './actions';

export function* archiveOrder({ payload }) {
  const order = payload;

  const value = {
    EstablishmentId: parseInt(order.EstablishmentId, 10),
    TableNumber: order.TableNumber,
    ArchivingTimestamp: {"long": parseInt(order.Timestamp, 10)}
  };

  let requestRoute;
  
  if (order.NotificationType === 'waiterCall') {
    value.NotificationType = "waiterCallArchive";
    requestRoute = 'waiter-call';
  } else if (order.NotificationType === 'billCall') {
    value.NotificationType = "billCallArchive";
    requestRoute = 'bill-call';
  }

  const data = {
    data: {
      value_schema: JSON.stringify(waiterCallArchiveSchema),
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
