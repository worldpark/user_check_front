import {combineReducers, configureStore} from "@reduxjs/toolkit";
import loginReducer from "./features/loginSlice";

import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['loginInfo']
};

const rootReducer = combineReducers({
    loginInfo: loginReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(store);