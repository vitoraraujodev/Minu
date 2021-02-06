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
        const { TableNumber, WaiterCallTimestamp } = action.payload;
        const stateClone = JSON.parse(JSON.stringify(state));

        try {
          stateClone.dashboard[TableNumber] = returnWithoutKey(
            stateClone.dashboard[TableNumber],
            WaiterCallTimestamp
          );
          if (Object.keys(stateClone.dashboard[TableNumber]).length === 0) {
            stateClone.dashboard = returnWithoutKey(
              stateClone.dashboard,
              TableNumber
            );
          }
          draft.dashboard = stateClone.dashboard;
        } catch (err) {
          // If this is who archived, it will already be out of the state
          // Order may be archived by someone else at the same time
          // If an order is not in the state for some reason, there is no reason to raise an exception
        }
        break;
      }
      default:
    }
  });
}
