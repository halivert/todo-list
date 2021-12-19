import React, { useState, useRef, useEffect } from "react";
import useDocumentListener from "@/utils/documentListener";
import TodoItem from "@/components/TodoItem";
import useStore from "@/hooks/useStore";

export default function TodoList() {
	const [text, setText] = useState("");
	const [completed, setCompleted] = useState([]);
	const todoInput = useRef(null);
	const documentListener = useDocumentListener({ todoInput });

	const [todos, setTodos, selectedTodo] = useStore((state) => [
		state.todos,
		state.setTodos,
		state.selectedTodo,
	]);

	const saveTodos = () => localStorage.setItem("todos", JSON.stringify(todos));
	const [addTodo, removeTodo, updateSelectedText, selectTodo] = useStore(
		(state) => [
			state.addTodo,
			state.removeTodo,
			state.updateSelectedText,
			state.selectTodo,
		]
	);

	useEffect(() => {
		documentListener();
		setTodos(JSON.parse(localStorage.getItem("todos")) ?? []);
	}, []);

	useEffect(() => {
		setText(selectedTodo.text);
		todoInput.current.focus();
	}, [selectedTodo.id]);

	useEffect(saveTodos, [todos, completed]);

	const addNewItem = (text) =>
		addTodo({ id: Date.now(), text, completed_at: null });

	const onSubmit = (e) => {
		e.preventDefault();
		const savedText = text;
		if (!text) return;
		setText("");

		if (selectedTodo.id) {
			if (!savedText.length) return removeTodo(selectedTodo.id);

			updateSelectedText(savedText);
			saveTodos();
			return selectTodo(null);
		}

		todoInput.current.focus();
		return addNewItem(savedText);
	};

	return (
		<div className="columns">
			<div className="column">
				<h1>TODO List</h1>
				<form onSubmit={onSubmit}>
					<fieldset>
						<div>
							<input
								ref={todoInput}
								className="input"
								placeholder={
									selectedTodo.id ? "Press enter to delete" : "New item"
								}
								onInput={(e) => setText(e.target.value)}
								value={text || ""}
							/>
						</div>
					</fieldset>
				</form>

				<ul className="todo-list">
					{todos.map((todo) => (
						<TodoItem todo={todo} key={todo.id} setCompleted={setCompleted} />
					))}
				</ul>
			</div>
			<div className="column summary">
				<h2>Summary</h2>
			</div>
		</div>
	);
}
