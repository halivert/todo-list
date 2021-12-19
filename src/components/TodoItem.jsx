import React, { useState } from "react";
import useStore from "@/hooks/useStore";

export default function TodoItem({ todo, setCompleted }) {
	const selectTodo = useStore((state) => state.selectTodo);
	const [completedAt, setCompletedAt] = useState(
		todo.completed_at ? new Date(todo.completed_at) : null
	);
	const isCompleted = completedAt !== null;

	const toggleComplete = () => {
		const comp = !isCompleted;
		todo.completed_at = comp ? new Date() : null;

		setCompleted((array) => {
			const i = array.findIndex((t) => todo.id === t.id);
			if (comp && i === -1) return [...array, todo];
			if (!comp && i !== -1) return array.filter((t) => todo.id !== t.id);
			return array;
		});

		return setCompletedAt(todo.completed_at);
	};

	const getCompletedAtString = (date) => {
		if (!date) return "";
		return `${date.toLocaleString()}`;
	};

	const onContextMenu = (evt) => {
		evt.preventDefault();
		selectTodo(todo.id);
	};

	return (
		<li>
			<div className="todo-item">
				<button
					tabIndex="0"
					onClick={toggleComplete}
					onContextMenu={onContextMenu}
					className={`item-text ${isCompleted && "completed"}`}
				>
					{todo.text}
				</button>
				<small className="completed-at">
					{getCompletedAtString(completedAt)}
				</small>
			</div>
		</li>
	);
}
