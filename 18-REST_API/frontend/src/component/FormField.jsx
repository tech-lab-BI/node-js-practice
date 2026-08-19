import { IoBagAdd } from "react-icons/io5";

function FormField({ todoName, setTodoName, todoDate, handleSubmit }) {
  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className="mb-8 flex flex-col gap-3 rounded-lg bg-white p-4 shadow-sm sm:flex-row sm:items-end"
    >
      <input
        type="text"
        placeholder="Enter task name"
        onChange={(event) => setTodoName(event.target.value)}
        className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
        value={todoName}
        required
      ></input>
      <input
        type="date"
        ref={todoDate}
        className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
      ></input>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-md bg-sky-600 px-4 py-2 font-medium text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      >
        Add
        <IoBagAdd />
      </button>
    </form>
  );
}

export default FormField;
