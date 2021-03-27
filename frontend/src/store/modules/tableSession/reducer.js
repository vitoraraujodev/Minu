import producer from 'immer';

const INITIAL_STATE = {
  tableSession: {},
};

function returnWithoutKey(object, keyToRemove) {
  return Object.keys(object)
  .filter((key) =>  keyToRemove !== key)
  .reduce((obj, key) => {
    obj[key] = object[key];
    return obj;
  }, {});
}

export default function tableSession(state = INITIAL_STATE, action) {
  return producer(state, (draft) => {
    switch (action.type) {
      case '@tableSession/ADD_TABLE_SESSION': {
        const { TableNumber } = action.payload;
        if (!draft.tableSession.hasOwnProperty(TableNumber)) {
          draft.tableSession[TableNumber] = {};
        }

        draft.tableSession[TableNumber] = action.payload;
        break;
      }
      case '@tableSession/RECEIVED_CLOSE_TABLE_SESSION': {
        const { TableNumber } = action.payload;
        const stateClone = JSON.parse(JSON.stringify(state));

        try {
          stateClone.tableSession = returnWithoutKey(
            stateClone.tableSession,
            TableNumber.toString()
          );
          draft.tableSession = stateClone.tableSession;
        } catch (err) {
          console.log('Unable to remove table session: ', err);
          // If this is the device who archived, it will already be out of the state
          // Table session may be archived by someone else at the same time
          // If a table session is not in the state for some reason, there is no reason to raise an exception
        }
        break;
      }
      default:
    }
  });
}
