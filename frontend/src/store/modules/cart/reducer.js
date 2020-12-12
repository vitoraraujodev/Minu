import producer from 'immer';

const INITIAL_STATE = {
  cart: [],
};

export default function cart(state = INITIAL_STATE, action) {
  return producer(state, (draft) => {
    switch (action.type) {
      case '@cart/ADD_SUCCESS': {
        draft.cart.push(action.payload.productOrder);
        break;
      }
      case '@cart/REMOVE': {
        // Finds productOrder's index in cart
        const productIndex = draft.cart.findIndex(
          (p) => p.id === action.payload.id
        );

        if (productIndex >= 0) {
          draft.cart.splice(productIndex, 1);
        }
        break;
      }
      case '@cart/UPDATE_AMOUNT_SUCCESS': {
        // Finds productOrder's index in cart
        const productIndex = draft.cart.findIndex(
          (p) => p.id === action.payload.id
        );

        if (productIndex >= 0) {
          draft.cart[productIndex].amount = Number(action.payload.amount);
        }
        break;
      }
      case '@session/CHECK_OUT': {
        draft.cart = [];
        break;
      }
      default:
    }
  });
}
