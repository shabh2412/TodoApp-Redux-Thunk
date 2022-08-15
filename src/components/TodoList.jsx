import { Box, Button, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, getTodos, updateTodo } from "../Redux/todos/todos.actions";

const TodoList = () => {
	const { todos, isError, isLoading } = useSelector((state) => state.todos);

	const toast = useToast({
		isClosable: true,
		duration: 2000,
	});

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTodos());
	}, [dispatch]);

	const handleUpdate = (todo) => {
		dispatch(updateTodo(todo));
	};

	useEffect(() => {
		toast({
			status: !isError ? "success" : "error",
			title: !isError ? "Operation Successfull" : "Some error occurred",
		});
	}, [todos]);

	return (
		<Box>
			{isLoading && <Text textColor="orange">Loading...</Text>}
			{isError && <Text textColor="red">Some error Occured...</Text>}
			{todos?.map(
				(todo) =>
					todo.title && (
						<SimpleGrid
							key={todo.id}
							border="0.5px solid gray"
							padding="15px"
							marginY="10px"
							borderRadius="10px"
							alignItems="center"
							gap="1em"
							columns={{ sm: 1, md: 3 }}>
							<h3>{todo.title}</h3>
							<Button
								colorScheme={todo.status ? "red" : "green"}
								onClick={() => {
									handleUpdate(todo);
								}}>
								{todo.status ? "UNDO" : "Mark as done"}
							</Button>
							{todo.status && (
								<Button
									colorScheme="red"
									onClick={() => {
										dispatch(deleteTodo(todo));
									}}>
									Delete
								</Button>
							)}
						</SimpleGrid>
					)
			)}
		</Box>
	);
};

export default TodoList;
