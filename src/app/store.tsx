import type { Store } from 'redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const middleware: any[] = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export const store: Store = createStore(rootReducer, applyMiddleware(...middleware));

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
