
import {AsyncStorage} from 'react-native';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import {logger} from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
import Immutable from 'seamless-immutable'
import immutablePersistenceTransform from './ImmutablePersistenceTransform'

let enhancer;
export function configureStore() {
    if (process.env.NODE_ENV === 'development') {
        enhancer = compose(
            applyMiddleware(thunk),
            // applyMiddleware(logger),
        )(createStore);
    } else {
        enhancer = compose(
            applyMiddleware(thunk),
        )(createStore);
    }

    const store = autoRehydrate(Immutable({}))(enhancer)(rootReducer);
  //  const store = createStore(rootReducer, initialState, enhancer);

    let opt = {
        storage: AsyncStorage,
        transform: [],
        blacklist: [],
        transforms: [immutablePersistenceTransform]
    };
    persistStore(store, opt);

    // if (module.hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('../reducers', () => {
    //         store.replaceReducer(rootReducer);
    //     });
    // }

    return store;
}

