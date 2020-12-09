import storage from 'redux-persist/lib/storage';

import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'minu',
      storage,
      whitelist: ['auth', 'establishment', 'customer', 'session'],
    },
    reducers
  );
  return persistedReducer;
};
