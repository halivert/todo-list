import keyboard from "keyboardjs";
import useStore from "@/hooks/useStore";

export default function useKeyboard({ input, todoRefs }) {
  function normalMode(e) {
    return e.target.blur();
  }

  function insertMode(e) {
    if (e.target.tagName === "BUTTON") {
      const id = parseInt(e.target.dataset?.id, 10);
      if (!id) return;
      e.preventDefault();

      useStore.setState({
        selectedTodo: useStore.getState().todos.find((t) => t.id === id),
      });
      return input?.current.focus();
    }

    if (e.target.tagName !== "INPUT") {
      e.preventDefault();
      return input?.current.focus();
    }
  }

  function paste(e) {
    if (e.target.tagName === "BUTTON") {
      e.preventDefault();

      const deletedTodo = useStore.getState().deletedTodo;
      if (!deletedTodo.id) return;

      const id = parseInt(e.target.dataset?.id, 10);
      const idx =
        (useStore.getState().todos.findIndex((t) => t.id === id) || 0) +
        !e.shiftKey;

      const todos = useStore.getState().todos;

      return useStore.setState({
        deletedTodo: {},
        todos: [...todos.slice(0, idx), deletedTodo, ...todos.slice(idx)],
      });
    }
  }

  function down(e) {
    if (e.target.tagName === "BUTTON") {
      e.preventDefault();
      const idx = todoRefs.current.findIndex((t) => t === e.target);
      return todoRefs.current?.[idx + 1]?.focus();
    }

    if (e.target.tagName !== "INPUT") {
      e.preventDefault();
      return todoRefs.current?.[0]?.focus();
    }
  }

  function up(e) {
    if (e.target.tagName === "BUTTON") {
      e.preventDefault();
      const idx = todoRefs.current.findIndex((t) => t === e.target);
      return todoRefs.current?.[idx - 1]?.focus();
    }

    if (e.target.tagName !== "INPUT") {
      e.preventDefault();
      return todoRefs.current?.[todoRefs.current.length - 1]?.focus();
    }
  }

  return [
    () => {
      keyboard.bind("esc", normalMode);
      keyboard.bind("i", insertMode);
      keyboard.bind(["p", "shift + p"], paste);
      keyboard.bind("j", down);
      keyboard.bind("k", up);
    },
    () => keyboard.reset(),
  ];
}
