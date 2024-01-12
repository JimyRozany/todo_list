import { useEffect, useMemo, useState } from "react";
import Todo from "./Todo";

import { useTodos } from "../contexts/TodosContext";
import { ButtonGroup, Button, Input } from "@material-tailwind/react";
import { useToast } from "../contexts/ToastContext";

function TodoList() {
  const { todos, dispatch } = useTodos();
  const { showHideToast } = useToast();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [popupTodo, setPopupTodo] = useState(null);
  // const [updateTodo, setUpdateTodo] = useState({});

  const [inputTodo, setInputTodo] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  let todosToBeRendered = todos;

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);
  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  useEffect(() => {
    dispatch({ type: "getTodos" });
  }, []);

  // handlers
  //   show delete popup
  function handleDeleteClick(todo) {
    setPopupTodo(todo);
    setShowDeleteModal(true);
  }
  // delete confirmation
  function handleDeleteConfirmation() {
    dispatch({ type: "delete", payload: popupTodo });
    setShowDeleteModal(false);
    showHideToast("تم حذف المهمة");
  }
  //   show Update popup
  function handleUpdateClick(todo) {
    setPopupTodo(todo);
    setShowUpdateModal(true);
  }
  // update confirmation
  function handleUpdateConfirmation() {
    dispatch({ type: "update", payload: popupTodo });
    setShowUpdateModal(false);
    showHideToast("تم تحديث المهمة بنجاح");
  }

  const todosJSX = todosToBeRendered.map((t) => (
    <Todo
      key={t.id}
      todo={t}
      showDelete={handleDeleteClick}
      showUpdate={handleUpdateClick}
    />
  ));

  function handleAddTodo() {
    dispatch({ type: "add", payload: { title: inputTodo } });
    setInputTodo("");
    showHideToast("تم اضافة مهمة جديدة");
  }

  return (
    <>
      {/* Delete popup  */}
      {showDeleteModal ? (
        <>
          <div
            dir="rtl"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    هل انت متاكد من حذف المهمة؟
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    لا يمكنك التراجع عن الحذف بعد إتمامه.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent text-xl font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    إغلاق
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-emerald-600 text-xl font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleDeleteConfirmation}
                  >
                    نعم ،قم بالحذف
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* end  Delete  popup  */}
      {/* Update popup  */}
      {showUpdateModal ? (
        <>
          <div
            dir="rtl"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">تعديل المهمة</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="p-6 text-start w-[500px]" dir="ltr">
                  <div className="">
                    <Input
                      className="text-xl"
                      dir="rtl"
                      color="blue"
                      size="lg"
                      label="عنوان المهمة"
                      value={popupTodo.title}
                      onChange={(e) =>
                        setPopupTodo({
                          ...popupTodo,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mt-2">
                    <Input
                      className="text-xl"
                      dir="rtl"
                      color="blue"
                      size="lg"
                      label="تفاصيل"
                      value={popupTodo.details}
                      onChange={(e) =>
                        setPopupTodo({
                          ...popupTodo,
                          details: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-around p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <Button
                    onClick={() => setShowUpdateModal(false)}
                    className="text-red-500 text-xl font-Amiri "
                    size="lg"
                    variant="text"
                  >
                    إغلاق
                  </Button>
                  <Button
                    color="green"
                    size="lg"
                    className="font-Amiri text-xl"
                    onClick={handleUpdateConfirmation}
                  >
                    تأكيد
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {/* end  Update  popup  */}

      <div className="bg-white p-2 font-Amiri max-h-[500px] rounded-md" dir="rtl">
        <div className="">
          <h3 className="text-4xl font-bold">مهامي</h3>
          <hr className="bg-red-200 h-1" />
        </div>
        {/* buttons */}
        <div
          className="mt-2 text-gray-400 flex justify-center items-center"
          dir="ltr"
        >
          <ButtonGroup variant="outlined" className="mt-2">
            <Button
              className="text-md"
              onClick={() => setDisplayedTodosType("non-completed")}
            >
              غير منجز
            </Button>
            <Button
              className="text-md"
              onClick={() => setDisplayedTodosType("completed")}
            >
              منجز
            </Button>
            <Button
              className="text-md"
              onClick={() => setDisplayedTodosType("all")}
            >
              الكل
            </Button>
          </ButtonGroup>
        </div>
        {/* End buttons */}
        {/* All Todos */}
        <div className="h-[300px] overflow-scroll">{todosJSX}</div>
        {/* ======= end All Todos */}
        {/* Add new todo */}
        <div className="mt-4 grid grid-cols-4 gap-1">
          <input
            className="text-4xl p-2 outline-none border-2 border-gray-300 rounded-md col-span-3"
            placeholder="عنوان المهمة"
            type="text"
            value={inputTodo}
            onChange={(e) => setInputTodo(e.target.value)}
          />
          <Button
            className="col-span-1 text-2xl font-Amiri "
            onClick={handleAddTodo}
            disabled={!inputTodo}
            variant="gradient"
            color="blue-gray"
          >
            إضافة
          </Button>
        </div>
        {/* ========= End Add new todo */}
      </div>
    </>
  );
}

export default TodoList;
