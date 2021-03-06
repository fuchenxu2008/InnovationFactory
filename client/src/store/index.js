import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import throttle from '../utils/throttle';
import rootReducer from '../reducers'
import { loadState, saveState } from './localStorage'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const middlewares = [
  thunkMiddleware
]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').createLogger())
}

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
)

const persistedState = loadState();

export default function configStore () {
  // const store = createStore(rootReducer, enhancer)
  const store = createStore(rootReducer, persistedState, enhancer)
  // Intermittedly save state to cache
  store.subscribe(throttle(() => {
    const { global, event, workshop, printer, order } = store.getState();
    saveState({
      global,
      event,
      workshop,
      printer,
      order
    });
  }, 1000));
  return store
}
