import producer from 'immer';

const INITIAL_STATE = {
  signed: false,
  establishment: null,
  tableNumber: null,
  plan: null,
  loading: false,
};

export default function serviceSession(state = INITIAL_STATE, action) {
  return producer(state, (draft) => {
    switch (action.type) {
      case '@session/CHECK_SESSION': {
        draft.loading = true;
        break;
      }
      case '@session/CHECK_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@session/CHECK_IN_SUCCESS': {
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@session/CHECK_IN_FAILURE': {
        draft.signed = false;
        draft.loading = false;
        break;
      }
      case '@session/CHECK_OUT': {
        draft.signed = false;
        draft.loading = false;
        draft.establishment = null;
        break;
      }

      case '@session/SET_SESSION': {
        draft.establishment = action.payload.establishment;
        draft.tableNumber = action.payload.tableNumber;
        draft.plan = action.payload.establishment.plan.title;
        break;
      }
      case '@session/REMOVE_SESSION': {
        draft.establishment = null;
        draft.tableNumber = null;
        draft.plan = null;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.signed = false;
        draft.loading = false;
        draft.establishment = null;
        draft.tableNumber = null;
        draft.plan = null;
        break;
      }

      case '@global/REFRESH_STATE': {
        draft.loading = false;
        draft.establishment = null;
        draft.tableNumber = null;
        draft.plan = null;
        break;
      }
      default:
    }
  });
}
