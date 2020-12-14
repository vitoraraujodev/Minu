import producer from 'immer';

const INITIAL_STATE = {
  establishment: null,
};

export default function establishment(state = INITIAL_STATE, action) {
  return producer(state, (draft) => {
    switch (action.type) {
      case '@auth/ESTABLISHMENT_SIGN_IN_SUCCESS': {
        draft.establishment = action.payload.establishment;
        break;
      }
      case '@establishment/UPDATE_ESTABLISHMENT_SUCCESS': {
        draft.establishment = action.payload.establishment;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.establishment = null;
        break;
      }
      case '@establishment/UPDATE_ESTABLISHMENT_PHOTO': {
        draft.establishment.photo = action.payload.photo;
        break;
      }
      default:
    }
  });
}
