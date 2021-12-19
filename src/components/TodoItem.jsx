import React, { useState } from "react";

export default function TodoItem({ todo, editTodo, setCompleted }) {
	const [text, setText] = useState(todo.text);
	const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
	const [completedAt, setCompletedAt] = useState(null);

	const toggleComplete = (evt) => {
		const comp = !isCompleted;
		todo.completed_at = new Date();

		setCompleted((array) => {
			const idx = array.findIndex((t) => todo.id === t.id);
			if (comp && idx === -1) return [...array, todo];
			if (!comp && idx !== -1) return array.filter((t) => todo.id !== t.id);
			return array;
		});

		setCompletedAt(comp ? new Date() : null);
		return setIsCompleted(comp);
	};

	const getCompletedAtString = (date) => {
		if (!date) return "";
		return `${date.toLocaleString()}`;
	};

	const startEdition = (evt) => {
		evt.preventDefault();
		return editTodo({ setText, text, id: todo.id });
	};

	return (
		<li>
			<div className="todo-item">
				<button
					tabIndex="0"
					onClick={toggleComplete}
					onContextMenu={startEdition}
					className={`item-text ${isCompleted && "completed"}`}
				>
					{text}
				</button>
				<small className="completed-at">
					{getCompletedAtString(completedAt)}
				</small>
			</div>
		</li>
	);
}
