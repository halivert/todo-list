import React, { useState, useRef, useEffect } from "react";
import useDocumentListener from "@/utils/documentListener";
import TodoItem from "@/components/TodoItem";

export default function TodoList() {
	const todoInput = useRef(null);
	const todoItems = useRef([]);
	const [setText, setSetText] = useState(null);
	const [todos, setTodos] = useState([]);
	const [completed, setCompleted] = useState([]);

	const documentListener = useDocumentListener({ todoInput });

	useEffect(documentListener, []);

	const addNewItem = (text) => {
		if (!text) return;

		const todo = {
			id: Date.now(),
			text: text,
			completed: false,
			editing: false,
		};

		setTodos((items) => [todo, ...items]);
	};

	const removeItem = (id) => {
		setTodos((items) => items.filter((todo) => todo.id !== id));
		setSetText({ fn: null, id: null, text: null });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const text = setText?.text || "";
		todoInput.current.focus();

		if (setText?.fn) {
			if (!text?.length) return removeItem(setText.id);
			setText.fn(text);
			return setSetText({ ...setText, text: "" });
		}

		setSetText({ ...setText, text: "" });
		return addNewItem(text);
	};

	const editTodo = ({ setText: fn, text, id }) => {
		setSetText({ fn, text, id });
		todoInput.current.focus();
	};

	return (
		<div className="columns">
			<div className="column">
				<h1>TODO List</h1>
				<form onSubmit={onSubmit}>
					<fieldset>
						<div>
							<input
								className="input"
								ref={todoInput}
								id="todo-input"
								type="text"
								placeholder={setText?.fn ? "Press enter to delete" : "New item"}
								onInput={(e) =>
									setSetText({ ...setText, text: e.target.value })
								}
								value={setText?.text || ""}
							/>
						</div>
					</fieldset>
				</form>

				<ul className="todo-list">
					{todos.map((todo) => (
						<TodoItem
							ref={todoItems}
							todo={todo}
							key={todo.id}
							editTodo={editTodo}
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
