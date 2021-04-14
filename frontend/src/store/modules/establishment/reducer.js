import producer from 'immer';

const INITIAL_STATE = {
  establishment: null,
  inventoryAccessed: false,
  loading: false,
};

export default function establishment(state = INITIAL_STATE, action) {
  return producer(state, (draft) => {
    switch (action.type) {
      case '@auth/ESTABLISHMENT_SIGN_IN_SUCCESS': {
        draft.establishment = action.payload.establishment;
        break;
      }
      case '@auth/ESTABLISHMENT_SIGN_UP_SUCCESS': {
        draft.establishment = action.payload.establishment;
        break;
      }

      case '@establishment/UPDATE_ESTABLISHMENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@establishment/UPDATE_ESTABLISHMENT_SUCCESS': {
        draft.establishment = action.payload.establishment;
        draft.loading = false;
        break;
      }

      case '@establishment/UPDATE_ADDRESS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@establishment/UPDATE_ADDRESS_SUCCESS': {
        draft.establishment.address = action.payload.address;
        break;
      }

      case '@establishment/UPDATE_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.establishment = null;
        break;
      }

      case '@establishment/INVENTORY_ACCESS': {
        draft.inventoryAccessed = action.payload.access;
        break;
      }

      case '@global/REFRESH_STATE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
