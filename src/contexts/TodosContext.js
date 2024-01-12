import { createContext, useReducer, useContext } from "react";
import todosReducer from "../reducers/todosReducer";

const TodosContext = createContext([]);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);

  return (
    <TodosContext.Provider value={{ todos: todos, dispatch: dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodosContext);
};

export default TodosProvider;
