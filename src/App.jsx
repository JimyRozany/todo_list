import "./App.css";
import TodoList from "./components/TodoList";
import TodosProvider from "./contexts/TodosContext";
import { ToastProvider } from "./contexts/ToastContext"


function App() {
  return (
    <>
      <TodosProvider>
        <ToastProvider>
          <div className="App bg-[#282c34] flex justify-center items-center w-[100vw] h-[100vh]">
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </>
  );
 
}

export default App;
