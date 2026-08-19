function EmptyMessage() {
  return (
    <h3 className="rounded-lg border border-dashed border-slate-300 bg-white px-5 py-8 text-center text-lg font-semibold text-slate-700">
      Congratulations!
      <small className="ml-1 font-normal text-slate-500">No pending task</small>
    </h3>
  );
}

export default EmptyMessage;
