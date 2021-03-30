import producer from 'immer';

const INITIAL_STATE = {
  dashboard: {},
};

function returnWithoutKey(object, keyToRemove) {
  return Object.keys(object)
    .filter((key) => keyToRemove !== key)
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
}

function parseOpenCall(openCall) {
  const { NotificationType } = openCall;
  let { TableNumber, EstablishmentId } = openCall;
  let Timestamp;

  if (NotificationType === 'waiterCall') {
    Timestamp = openCall.WaiterCallTimestamp;
  } else if (NotificationType === 'billCall') {
    Timestamp = openCall.BillCallTimestamp;
  }

  TableNumber = parseInt(TableNumber, 10);
  Timestamp = parseInt(Timestamp, 10);
  EstablishmentId = parseInt(EstablishmentId, 10);

  return { NotificationType, TableNumber, Timestamp, EstablishmentId };
}

export default function dashboard(state = INITIAL_STATE, action) {
  return producer(state, (draft) => {
    switch (action.type) {
      case '@dashboard/ADD_ORDER': {
        const { TableNumber, Timestamp } = action.payload;
        if (!draft.dashboard[TableNumber]) {
          draft.dashboard[TableNumber] = {};

          draft.dashboard[TableNumber][Timestamp] = action.payload;
        } else {
          const notificationTypes = Object.values(
            draft.dashboard[TableNumber]
          ).map((orders) => orders.NotificationType);

          if (!notificationTypes.includes(action.payload.NotificationType)) {
            draft.dashboard[TableNumber][Timestamp] = action.payload;
          }
        }
        break;
      }
      case '@dashboard/ARCHIVE_ORDER_REQUEST': {
        const order = action.payload;

        draft.dashboard[order.TableNumber][order.Timestamp].loading = true;
        break;
      }
      case '@dashboard/ARCHIVE_ORDER_SUCCESS': {
        const { TableNumber, Timestamp } = action.payload;
        const stateClone = JSON.parse(JSON.stringify(state));
        stateClone.dashboard[TableNumber] = returnWithoutKey(
          stateClone.dashboard[TableNumber],
          Timestamp
        );

        if (Object.keys(stateClone.dashboard[TableNumber]).length === 0) {
          stateClone.dashboard = returnWithoutKey(
            stateClone.dashboard,
            TableNumber
          );
        }

        draft.dashboard = stateClone.dashboard;
        break;
      }
      case '@dashboard/ARCHIVE_ORDER_FAILURE': {
        const order = action.payload;

        draft.dashboard[order.TableNumber][order.Timestamp].loading = false;
        break;
      }
      case '@dashboard/RECEIVED_ORDER_ARCHIVE': {
        const { TableNumber, NotificationType } = action.payload;

        let CallTimestamp;

        if (NotificationType === 'waiterCallArchive') {
          CallTimestamp = action.payload.WaiterCallTimestamp;
        } else if (NotificationType === 'billCallArchive') {
          CallTimestamp = action.payload.BillCallTimestamp;
        }

        const tableNumber = TableNumber.toString();
        CallTimestamp = CallTimestamp.toString();
        const stateClone = JSON.parse(JSON.stringify(state));

        try {
          stateClone.dashboard[tableNumber] = returnWithoutKey(
            stateClone.dashboard[tableNumber],
            CallTimestamp
          );

          if (Object.keys(stateClone.dashboard[tableNumber]).length === 0) {
            stateClone.dashboard = returnWithoutKey(
              stateClone.dashboard,
              tableNumber
            );
          }
          draft.dashboard = stateClone.dashboard;
        } catch (err) {
          console.log('Unable to remove order: ', err);
          // If this is who archived, it will already be out of the state
          // Order may be archived by someone else at the same time
          // If an order is not in the state for some reason, there is no reason to raise an exception
        }
        break;
      }
      case '@dashboard/ADD_OPEN_CALLS': {
        const openCalls = action.payload;
        openCalls.forEach((openCall) => {
          const {
            NotificationType,
            TableNumber,
            Timestamp,
            EstablishmentId,
          } = parseOpenCall(openCall);

          if (!draft.dashboard[TableNumber]) {
            draft.dashboard[TableNumber] = {};
          }

          draft.dashboard[TableNumber][Timestamp] = {
            NotificationType,
            TableNumber,
            Timestamp,
            EstablishmentId,
          };
        });
        break;
      }
      default:
    }
  });
}
