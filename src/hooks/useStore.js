import create from "zustand";

const useStore = create((set) => ({
  todos: [],
  selectedTodo: {},

  setTodos: (todos) => set({ todos }),
  addTodo: (todo) => set((st) => ({ todos: [...st.todos, todo] })),
  removeTodo: (id) =>
    set((st) => ({
      todos: st.todos.filter((todo) => todo.id !== id),
    })),

  selectTodo: (id) =>
    set((st) => ({
      selectedTodo: id ? st.todos.find((todo) => todo.id === id) : {},
    })),
  updateSelectedText: (text) => set((st) => (st.selectedTodo.text = text)),
}));

export default useStore;
