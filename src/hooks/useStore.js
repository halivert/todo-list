import create from "zustand";

const useStore = create((set) => ({
  todos: [],
  selectedTodo: {},
  deletedTodo: {},

  setTodos: (todos) => set({ todos }),
  addTodo: (todo) => set((st) => ({ todos: [...st.todos, todo] })),
  insertTodo: (todo, idx) =>
    set((st) => ({
      todos: [...st.todos.slice(0, idx), todo, ...st.todos.slice(idx)],
    })),
  removeTodo: (id) =>
    set((st) => {
      const todo = st.todos.find((t) => t.id === id);

      return {
        deletedTodo: todo,
        todos: st.todos.filter((todo) => todo.id !== id),
      };
    }),

  selectTodo: (id) =>
    set((st) => ({
      selectedTodo: id ? st.todos.find((todo) => todo.id === id) : {},
    })),
  updateSelectedText: (text) => set((st) => (st.selectedTodo.text = text)),
}));

export default useStore;
