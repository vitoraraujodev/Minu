import producer from 'immer';

const INITIAL_STATE = {
  dashboard : {},
};

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
        var stateClone = JSON.parse(JSON.stringify(state));
        stateClone.dashboard[TableNumber] = returnWithoutKey(stateClone.dashboard[TableNumber], Timestamp)
        if (Object.keys(stateClone.dashboard[TableNumber]).length === 0) {
          stateClone.dashboard = returnWithoutKey(stateClone.dashboard, TableNumber);
        }
        draft.dashboard = stateClone.dashboard;
        break;
      }
      default:
    }
  });
}

function returnWithoutKey(object, keyToRemove) {
  return Object.keys(object)
    .filter(key => keyToRemove != key )
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
}