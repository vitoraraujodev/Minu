import producer from 'immer';

const INITIAL_STATE = {
  signed: false,
};

export default function session(state = INITIAL_STATE, action) {
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
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.signed = false;
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
