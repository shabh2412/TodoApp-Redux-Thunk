import { Box, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const Todo = () => {
	return (
		<Box>
			<Heading>Todo List</Heading>
			<VStack>
				<Box w={["90%", "80%", "55%", "30%"]}>
					<TodoInput />
					<TodoList />
				</Box>
			</VStack>
		</Box>
	);
};

export default Todo;
