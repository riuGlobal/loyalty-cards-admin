import { configureStore } from '@reduxjs/toolkit';
import type { Store } from 'redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';


const middleware: any[] = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export const store: Store = configureStore( {reducer: rootReducer, middleware: [...middleware]});
// export const store: Store = createStore<any , AnyAction | void>(rootReducer, applyMiddleware(...middleware));

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
