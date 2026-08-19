import { MdDeleteForever } from "react-icons/md";

function TodoItem(props) {
  return (
    <div className="mb-3 flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <span className="min-w-0 flex-1 wrap-break-words font-medium text-slate-800">
        {props.todoName}
      </span>
      <span className="shrink-0 text-sm text-slate-500">{props.todoDate}</span>
      <button
        type="button"
        className="inline-flex shrink-0 items-center gap-1 rounded-md border border-rose-300 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
        data-id={props.id}
        onClick={props.handleDelete}
      >
        Delete
        <MdDeleteForever />
      </button>
    </div>
  );
}

export default TodoItem;
