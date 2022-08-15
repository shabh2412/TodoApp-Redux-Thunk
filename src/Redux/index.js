import {
	legacy_createStore,
	combineReducers,
	compose,
	applyMiddleware,
} from "redux";
import { todosReducer } from "./todos/todos.reducer";
import thunk from "redux-thunk";
// combining reducers
const reducers = combineReducers({
	todos: todosReducer,
});
// using the compose enhancer for redux dev-tools
const composeEnhancer =
	(typeof window !== "undefined" &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

// const enhancer = composeEnhancer(applyMiddleware(thunk));
const customMiddleware = (store) => (next) => (action) => {
	typeof action === "function"
		? action(store.dispatch, store.getState)
		: next(action);
};

const enhancer = composeEnhancer(applyMiddleware(customMiddleware));

// using the thunk middleware
export const store = legacy_createStore(reducers, enhancer);
