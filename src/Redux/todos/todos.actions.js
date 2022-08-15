import {
	ADD_TODOS_FAILURE,
	ADD_TODOS_REQUEST,
	ADD_TODOS_SUCCESS,
	DELETE_TODOS_FAILURE,
	DELETE_TODOS_REQUEST,
	DELETE_TODOS_SUCCESS,
	GET_TODOS_FAILURE,
	GET_TODOS_REQUEST,
	GET_TODOS_SUCCESS,
	UPDATE_TODOS_FAILURE,
	UPDATE_TODOS_REQUEST,
	UPDATE_TODOS_SUCCESS,
} from "./todos.types";

import axios from "axios";
import { todosUrl } from "./links";

const getTodosRequest = () => {
	return {
		type: GET_TODOS_REQUEST,
	};
};

const getTodosSuccess = (payload) => {
	return {
		type: GET_TODOS_SUCCESS,
		payload,
	};
};

const getTodosFailure = (err) => {
	return {
		type: GET_TODOS_FAILURE,
		payload: err,
	};
};

export const getTodos = () => (dispatch) => {
	const requestAction = getTodosRequest();
	dispatch(requestAction);
	axios
		.get(todosUrl)
		.then((res) => {
			const successAction = getTodosSuccess(res.data);
			dispatch(successAction);
		})
		.catch((err) => {
			const errorAction = getTodosFailure(err.message);
			dispatch(errorAction);
		});
};

// ADD TODO

const addTodoRequest = () => {
	return {
		type: ADD_TODOS_REQUEST,
	};
};

const addTodosFailure = (err) => {
	return {
		type: ADD_TODOS_FAILURE,
		payload: err,
	};
};

// const addTodosSuccess = () => {
// 	return {
// 		type: ADD_TODOS_SUCCESS,
// 	};
// };

export const addTodo = (payload) => (dispatch) => {
	const addRequestAction = addTodoRequest();
	dispatch(addRequestAction);
	axios
		.post(todosUrl, {
			title: payload,
			status: false,
		})
		.then(() => {
			// const addSuccessAction = addTodosSuccess();
			// dispatch(addSuccessAction);
			dispatch(getTodos());
		})
		.catch((err) => {
			const addErrorAction = addTodosFailure(err.message);
			dispatch(addErrorAction);
		});
};

// UPDATE TODOS
const updateTodosRequest = () => ({
	type: UPDATE_TODOS_REQUEST,
});
const updateTodosFailure = (err) => ({
	type: UPDATE_TODOS_FAILURE,
	payload: err,
});
// const updateTodosSuccess = () => ({
// 	type: UPDATE_TODOS_SUCCESS,
// });

export const updateTodo = (payload) => (dispatch) => {
	const updateRequestAction = updateTodosRequest();
	dispatch(updateRequestAction);
	axios
		.patch(`${todosUrl}/${payload.id}`, {
			...payload,
			status: !payload.status,
		})
		.then(() => {
			// const updateSuccessAction = updateTodosSuccess();
			// dispatch(updateSuccessAction);
			dispatch(getTodos());
		})
		.catch((err) => {
			const updateFailureAction = updateTodosFailure(err.message);
			dispatch(updateFailureAction);
		});
};

// DELETE TODO ITEM

const deleteTodoRequest = () => ({
	type: DELETE_TODOS_REQUEST,
});
const deleteTodoFailure = (err) => ({
	type: DELETE_TODOS_FAILURE,
	payload: err,
});
// const deleteTodoSuccess = () => ({
// 	type: DELETE_TODOS_SUCCESS,
// });

export const deleteTodo = (payload) => (dispatch) => {
	const deleteRequestAction = deleteTodoRequest();
	dispatch(deleteRequestAction);
	axios
		.delete(`${todosUrl}/${payload.id}`)
		.then(() => {
			// const deleteSuccessAction = deleteTodoSuccess();
			// dispatch(deleteSuccessAction);
			dispatch(getTodos());
		})
		.catch((err) => {
			const deleteErrorAction = deleteTodoFailure(err.message);
			dispatch(deleteErrorAction);
		});
};
