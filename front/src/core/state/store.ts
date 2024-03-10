import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'
import loggerMiddleware from './middleware/logger'
import monitorReducerEnhancer from './enhancers/monitorReducer'
import { composeWithDevTools } from '@redux-devtools/extension';

const middlewares = [loggerMiddleware, thunkMiddleware]
const middlewareEnhancer = applyMiddleware(...middlewares)

const enhancers = [middlewareEnhancer, monitorReducerEnhancer]
const composedEnhancers = composeWithDevTools(...enhancers)

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (e) {
        return undefined;
    }
}

const persistState = loadState();

const store = createStore(rootReducer, persistState, composedEnhancers);
export const Dispatch = store.dispatch;
export default store;
