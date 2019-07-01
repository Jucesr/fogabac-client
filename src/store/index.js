import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import solicitantesReducer from './reducers/solicitantes'
import apoyosReducer from './reducers/apoyos'
import tcReducer from './reducers/tipo_creditos'
import appReducer from './reducers/app'
import creditosReducer from './reducers/creditos'

//Middleware
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            apoyos: apoyosReducer,
            solicitantes: solicitantesReducer,
            tipo_creditos: tcReducer,
            app: appReducer,
            creditos: creditosReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};
