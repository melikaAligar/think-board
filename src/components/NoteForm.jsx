import { X } from "lucide-react";

function NoteForm({
  editingNote,
  title,
  content,
  saving,
  onTitleChange,
  onContentChange,
  onSubmit,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <form
        onSubmit={onSubmit}
        noValidate
        className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl md:p-8"
      >
        <div className="mb-7 flex items-center justify-between">
          <h3 className="text-xl font-bold text-violet-700">
            {editingNote ? "ویرایش یادداشت" : "ساخت یادداشت جدید"}
          </h3>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="بستن فرم"
            className="rounded-xl p-2 text-slate-400 transition hover:bg-pink-50 hover:text-rose-500"
          >
            <X size={21} />
          </button>
        </div>

        <label className="mb-2 block text-sm font-semibold">
          عنوان یادداشت
        </label>

        <input
          type="text"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="عنوان یادداشت را وارد کنید"
          maxLength={100}
          required
          className="mb-5 w-full rounded-2xl border border-pink-100 bg-[#FFFAFC] px-4 py-3 text-right outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
        />

        <div className="mb-5 mt-2 flex justify-start text-xs text-slate-400">
          <span>{100 - title.length}/100</span>
        </div>

        <label className="mb-2 block text-sm font-semibold">
          توضیحات
        </label>

        <textarea
          value={content}
          onChange={(event) => onContentChange(event.target.value)}
          placeholder="متن یادداشت را وارد کنید"
          rows={6}
          maxLength={100}
          required
          className="mb-6 w-full resize-y rounded-2xl border border-pink-100 bg-[#FFFAFC] px-4 py-3 text-right leading-7 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
        />

        <div className="mb-5 mt-2 flex justify-start text-xs text-slate-400">
          <span>{100 - content.length}/100</span>
        </div>

        <div className="flex justify-start gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-200 disabled:opacity-50"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "در حال ذخیره"
              : editingNote
                ? "ذخیره تغییرات"
                : "ثبت یادداشت"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;
