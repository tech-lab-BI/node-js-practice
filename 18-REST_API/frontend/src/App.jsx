import { useEffect, useRef, useState } from "react";

import EmptyMessage from "./component/EmptyMessage";
import FormField from "./component/FormField";
import Title from "./component/Title";
import TodoItem from "./component/TodoItem";
import {
  addItemToServer,
  getItemFromServer,
  deleteItem,
} from "./services/ItemServices";

function App() {
  const [todoList, setTodoList] = useState([]);

  let [todoName, setTodoName] = useState("");
  let todoDate = useRef("");

  useEffect(() => {
    getItemFromServer().then((initialItems) => {
      console.log(initialItems);
      setTodoList(initialItems);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const serverItem = await addItemToServer(todoName, todoDate.current.value);

    setTodoList([...todoList, serverItem]);
    setTodoName("");
    todoDate.current.value = "";
  };
  async function handleDelete(event) {
    let deleteIndex = event.currentTarget.getAttribute("data-id");
    await deleteItem(deleteIndex);
    setTodoList(todoList.filter((item) => item._id != deleteIndex));
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Title></Title>
        <FormField
          todoName={todoName}
          setTodoName={setTodoName}
          todoDate={todoDate}
          handleSubmit={handleSubmit}
        ></FormField>
        {todoList.length === 0 && <EmptyMessage />}
        {todoList.map((item, index) => (
          <TodoItem
            key={index}
            todoName={item.task}
            todoDate={item.date}
            id={item._id}
            handleDelete={handleDelete}
          ></TodoItem>
        ))}
        {todoList.length !== 0 && (
          <button
            type="button"
            className="mt-6 rounded-md bg-rose-600 px-4 py-2 font-medium text-white transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            onClick={() => setTodoList([])}
          >
            Clear all
          </button>
        )}
      </div>
    </main>
  );
}

export default App;
