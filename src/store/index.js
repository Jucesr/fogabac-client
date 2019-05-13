import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import solicitantesReducer from './reducers/solicitantes'
import apoyosReducer from './reducers/apoyos'
import creditosReducer from './reducers/creditos'
import appReducer from './reducers/app'

//Middleware
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            apoyos: apoyosReducer,
            solicitantes: solicitantesReducer,
            creditos: creditosReducer,
            app: appReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};
