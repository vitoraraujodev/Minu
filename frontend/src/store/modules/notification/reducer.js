import producer from 'immer';

const INITIAL_STATE = {
  eventSourceObject: null,
};

export default function notification(state = INITIAL_STATE, action) {
  return producer(state, (draft) => {
    switch (action.type) {
      case '@notification/CREATE_NOTIFICATION_OBJECT': {
        draft.eventSourceObject = action.payload;
        break;
      }
      case '@notification/DELETE_NOTIFICATION_OBJECT': {
        draft.eventSourceObject = null;
        break;
      }
      default:
    }
  });
}
