import {applyMiddleware, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import rootReducer from './store.js'

export default function configureStore(preLoadedState:any={}) {
    const middleWares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middleWares);
    const composeEnhancers = composeWithDevTools({});
    const store = createStore(rootReducer, preLoadedState, composeEnhancers(
        middlewareEnhancer
    ));
    if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
        (module as any).hot.accept('./store', () => store.replaceReducer(rootReducer))
    }

    return store
}
