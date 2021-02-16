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
  let { NotificationType, TableNumber, EstablishmentId } = openCall;
  let Timestamp;

  if(NotificationType === "waiterCall") { Timestamp = openCall.WaiterCallTimestamp; }
  else if (NotificationType === "billCall") { Timestamp = openCall.BillCallTimestamp; }

  TableNumber = parseInt(TableNumber);
  Timestamp = parseInt(Timestamp);
  EstablishmentId = parseInt(EstablishmentId);

  return { NotificationType, TableNumber, Timestamp, EstablishmentId };
}

export default function dashboard(state = INITIAL_STATE, action) {
  return producer(state, (draft) => {
    switch (action.type) {
      case '@dashboard/ADD_ORDER': {
        const { TableNumber, Timestamp } = action.payload;
        if (!draft.dashboard.hasOwnProperty(TableNumber)) {
          draft.dashboard[TableNumber] = {};
        }

        draft.dashboard[TableNumber][Timestamp] = action.payload;
        break;
      }
      case '@dashboard/DELETE_ORDER': {
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
      case '@dashboard/RECEIVED_ARCHIVE_ORDER': {
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
      case '@dashboard/ADD_BULK_OPEN_CALLS': {
        const openCalls = action.payload;
        for(const openCall of openCalls) {
          const { NotificationType, TableNumber, Timestamp, EstablishmentId } = parseOpenCall(openCall);
          if (!draft.dashboard.hasOwnProperty(TableNumber)) {
            draft.dashboard[TableNumber] = {};
          }
          draft.dashboard[TableNumber][Timestamp] = { NotificationType, TableNumber, Timestamp, EstablishmentId };
        }
        break;
      }
      default:
    }
  });
}