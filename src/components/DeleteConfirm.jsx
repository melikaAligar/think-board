function DeleteConfirm({ deleteLoading, onConfirm, onCancel }) {
  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4"
    >
      <div className="w-full max-w-md rounded-3xl bg-white p-7 text-right shadow-2xl">
        <h2 className="text-xl font-bold text-violet-700">
          حذف یادداشت
        </h2>

        <p className="mt-4 leading-8 text-slate-500">
          آیا از حذف این یادداشت مطمئن هستید؟
        </p>

        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleteLoading}
            className="flex-1 rounded-xl bg-rose-500 px-5 py-3 font-semibold text-white transition hover:bg-rose-600 disabled:opacity-50"
          >
            {deleteLoading ? "در حال حذف" : "حذف یادداشت"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={deleteLoading}
            className="flex-1 rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-200 disabled:opacity-50"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;
