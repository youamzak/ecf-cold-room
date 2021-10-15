import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  REHYDRATE,
  PERSIST,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slices/user.slice";
import officineSlice from "./slices/officine.slice";

const rootReducer = combineReducers({
  user : userSlice.reducer,
  coldRoom: officineSlice.reducer,
})

const persistConfig = {
  key: "root",
  storage,
  version: 1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PERSIST],
      },
    }),
});

export let persistor = persistStore(store);
export default store;
