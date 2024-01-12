import { v4 as uuidv4 } from "uuid";

export default function todosReducer(currentTodos, action) {
  switch (action.type) {
    case "add": {
      let newTodos = [...currentTodos];
      newTodos.push({
        id: uuidv4(),
        title: action.payload.title,
        details: "",
        isCompleted: false,
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    }
    case "update": {
      const todosUpdated = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(todosUpdated));
      return todosUpdated;
    }
    case "delete": {
      const todosUpdated = currentTodos.filter(
        (t) => t.id !== action.payload.id
      );
      localStorage.setItem("todos", JSON.stringify(todosUpdated));
      return todosUpdated;
    }
    case "getTodos": {
      const stoageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return stoageTodos;
    }
    case "toggledCompleted": {
      const todosUpdated = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return { ...t, isCompleted: !t.isCompleted };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(todosUpdated));
      return todosUpdated;
    }

    default:
      throw Error("Unknown Action : " + action.type);
  }

  // return [];
}
