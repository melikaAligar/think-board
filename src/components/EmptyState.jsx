import { NotebookPen } from "lucide-react";

function EmptyState({ search, onCreateNote }) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-pink-200 bg-white/80 px-5 py-16 text-center">
      <NotebookPen
        size={42}
        className="mx-auto mb-5 text-violet-400"
      />

      <h3 className="text-xl font-bold">
        {search
          ? "یادداشتی پیدا نشد"
          : "هنوز یادداشتی ثبت نکردی"}
      </h3>

      <p className="mt-3 text-sm text-slate-400">
        {search
          ? "عبارت دیگری را برای جستجو امتحان کن"
          : "اولین یادداشتت را بساز"}
      </p>

      {!search && (
        <button
          type="button"
          onClick={onCreateNote}
          className="mt-6 rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-600"
        >
          ساخت یادداشت جدید
        </button>
      )}
    </div>
  );
}

export default EmptyState;
