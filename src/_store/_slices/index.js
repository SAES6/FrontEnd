import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import userSlice from "./user-slice";
import questionnaireSlice from './questionnaire-slice';

const rootReducer = combineReducers({
    user: userSlice.reducer,
    questionnaire: questionnaireSlice.reducer,
});

const rootPersistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/PERSIST', 'persist/PURGE', 'persist/REGISTER'],
            },
        }).concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
