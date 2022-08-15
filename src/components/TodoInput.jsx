import {
	Box,
	Button,
	Input,
	InputGroup,
	InputRightElement,
	useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { addTodo } from "../Redux/todos/todos.actions";
import { useDispatch } from "react-redux";

const TodoInput = () => {
	const [title, setTitle] = useState("");
	const dispatch = useDispatch();
	const toast = useToast({
		isClosable: true,
		duration: 5000,
	});
	const handleAdd = () => {
		if (title.length === 0) {
			return toast({
				title: "Input cannot be empty!",
				description: "Please type something in the task input",
				status: "error",
			});
		}
		dispatch(addTodo(title));
		setTitle("");
		return toast({
			title: "Task Added Successfully!",
			description: `Your task: ${title} is added successfully!`,
			status: "success",
		});
	};
	return (
		<Box>
			<InputGroup>
				<Input
					placeholder="Enter your task"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<InputRightElement width="fit-content">
					<Button colorScheme="blue" onClick={handleAdd}>
						Add
					</Button>
				</InputRightElement>
			</InputGroup>
		</Box>
	);
};

export default TodoInput;
