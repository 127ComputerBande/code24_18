import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage                          from 'redux-persist/lib/storage';
import { composeWithDevTools }          from 'redux-devtools-extension';
import createSagaMiddleware             from 'redux-saga';
import { createLogger }                 from 'redux-logger';
import rootReducer                      from './reducer'
import sagas                            from './sagas';
import { middleware }                   from './utils/redux';

const persistConfig = {
    key:       'root',
    storage,
    blacklist: [
        'Navigation',
        'Loading'
    ]
};

const logger = createLogger({
    collapsed: true,
    duration:  true
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware   = createSagaMiddleware();

export default () => {
    let store     = createStore(persistedReducer, composeWithDevTools(
        applyMiddleware(middleware, sagaMiddleware, logger),
    ));
    let persistor = persistStore(
        store,
        null,
        () => {
            sagaMiddleware.run(sagas.startUp);
        }
    );
    sagaMiddleware.run(sagas.root);
    return { store, persistor }
}
