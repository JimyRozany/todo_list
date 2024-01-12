import { AiOutlineCheck, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useToast } from "../contexts/ToastContext";
// import { useSnackbar } from "../contexts/SnackbarContext";
import { useTodos } from "../contexts/TodosContext";
function Todo({ todo, showDelete, showUpdate }) {
  // const { todos, setTodos } = useContext(TodosContext);
  const { dispatch } = useTodos();
  const { showHideToast } = useToast();

  function handleCheckClick() {
    // console.log(todos);
    dispatch({ type: "toggledCompleted", payload: todo });
    showHideToast("تم التحديث");
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-1 mt-4 p-4 bg-blue-800 text-white rounded-md hover:shadow-2xl">
        <div className="col-span-8 flex flex-col items-start">
          <h3
            className={`${
              todo.isCompleted ? "line-through" : ""
            } text-4xl text-gray-100`}
          >
            {todo.title}
          </h3>
          <p className="text-xl">{todo.details}</p>
        </div>
        {/* Actions */}
        <div className="col-span-4 flex justify-around items-center gap-2">
          <div
            onClick={handleCheckClick}
            className={`${
              todo.isCompleted
                ? "bg-green-500 text-white"
                : "text-green-500 bg-white"
            } border border-green-500 rounded-full p-2 text-xl hover:text-green-400 hover:border-green-400 hover:shadow-xl cursor-pointer`}
          >
            <AiOutlineCheck />
          </div>
          <div
            onClick={() => showUpdate(todo)}
            className="text-blue-500 bg-white border border-blue-500 rounded-full p-2 text-xl hover:text-blue-400 hover:border-blue-400 hover:shadow-xl cursor-pointer"
          >
            <AiOutlineEdit />
          </div>
          <div
            onClick={() => showDelete(todo)}
            className="text-red-700 bg-white border border-red-700 rounded-full p-2 text-xl hover:text-red-400 hover:border-red-400 hover:shadow-xl cursor-pointer"
          >
            <AiOutlineDelete />
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
