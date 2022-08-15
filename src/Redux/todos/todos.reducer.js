import {
	ADD_TODOS_FAILURE,
	ADD_TODOS_REQUEST,
	ADD_TODOS_SUCCESS,
	GET_TODOS_FAILURE,
	GET_TODOS_REQUEST,
	GET_TODOS_SUCCESS,
} from "./todos.types";

const initState = {
	todos: [],
	isError: false,
	isLoading: true,
};

export const todosReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case GET_TODOS_REQUEST: {
			return {
				...state,
				isLoading: true,
				isError: false,
			};
		}
		case GET_TODOS_FAILURE: {
			return {
				...state,
				isError: true,
				isLoading: false,
			};
		}
		case GET_TODOS_SUCCESS: {
			return {
				...state,
				isLoading: false,
				isError: false,
				todos: payload,
			};
		}
		case ADD_TODOS_SUCCESS: {
			return {
				...state,
				isLoading: false,
				isError: false,
			};
		}
		case ADD_TODOS_REQUEST: {
			return {
				...state,
				isLoading: true,
				isError: false,
			};
		}
		case ADD_TODOS_FAILURE: {
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		}
		default: {
			return state;
		}
	}
};
