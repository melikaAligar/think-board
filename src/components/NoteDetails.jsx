import { X } from "lucide-react";
import formatDate from "../utils/formatDate";

function NoteDetails({ selectedNote, detailsLoading, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4">
      <div className="my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-violet-700">
            جزئیات یادداشت
          </h3>

          <button
            type="button"
            onClick={onClose}
            aria-label="بستن جزئیات"
            className="rounded-xl p-2 text-slate-400 hover:bg-pink-50 hover:text-rose-500"
          >
            <X size={21} />
          </button>
        </div>

        {detailsLoading ? (
          <p className="py-10 text-center text-violet-500">
            در حال دریافت جزئیات
          </p>
        ) : (
          <>
            <h4 className="min-w-0 break-words [overflow-wrap:anywhere] text-lg font-bold">
              {selectedNote.title}
            </h4>

            <p className="mt-4 min-w-0 whitespace-pre-wrap break-words [overflow-wrap:anywhere] leading-8 text-slate-600">
              {selectedNote.content}
            </p>

            <p className="mt-6 border-t border-pink-100 pt-4 text-sm text-slate-400">
              تاریخ ایجاد: {formatDate(selectedNote.createdAt)}
            </p>
          </>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-600"
        >
          بستن
        </button>
      </div>
    </div>
  );
}

export default NoteDetails;
