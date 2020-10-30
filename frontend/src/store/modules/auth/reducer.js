import producer from 'immer';

const INITIAL_STATE = {
  token: null,
  loading: false,
  inventoryAccessed: true,
  kind: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return producer(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.loading = false;
        draft.kind = action.payload.kind;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.kind = null;
        break;
      }
      case '@auth/INVENTORY_ACCESS': {
        draft.inventoryAccessed = action.payload.access;
        break;
      }
      default:
    }
  });
}
