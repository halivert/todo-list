import React, { useState, useRef, useEffect } from "react";
import TodoItem from "@/components/TodoItem";
import useStore from "@/hooks/useStore";
import useKeyboard from "@/hooks/useKeyboard";

export default function TodoList() {
	const [text, setText] = useState("");
	const [completed, setCompleted] = useState([]);
	const todoInput = useRef(null);
	const todoRefs = useRef([]);

	const [todos, setTodos, selectedTodo, deletedTodo] = useStore((state) => [
		state.todos,
		state.setTodos,
		state.selectedTodo,
		state.deletedTodo,
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

	const [registerKeyboardBindings, removeKeyboardBindings] = useKeyboard({
		input: todoInput,
		todoRefs: todoRefs,
	});

	useEffect(() => {
		setTodos(
			(JSON.parse(localStorage.getItem("todos")) ?? []).filter((t) => t.id)
		);
		registerKeyboardBindings();

		return () => removeKeyboardBindings();
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
		setText("");

		if (selectedTodo.id) {
			if (!savedText.length) {
				removeTodo(selectedTodo.id);
			} else {
				updateSelectedText(savedText);
				saveTodos();
			}
			return selectTodo(null);
		}

		if (!savedText) return;
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
					{todos.map((todo, i) => (
						<TodoItem
							ref={(ref) => todoRefs.current[i] = ref}
							todo={todo}
							key={todo.id}
							setCompleted={setCompleted}
						/>
					))}
				</ul>
			</div>
			<div className="column summary">
				<h2>Summary</h2>
				<p>
					Completed: <strong>{completed.length}</strong>
				</p>
				<p>
					Not completed: <strong>{todos.length - completed.length}</strong>
				</p>
			</div>
		</div>
	);
}
