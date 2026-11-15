import {
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

import formatDate from "../utils/formatDate";

// رنگ‌ها برای کارت‌های یادداشت
const noteColors = [
  "#FCE7F3",
  "#EDE9FE",
  "#FEF3C7",
  "#E0F2FE",
  "#FFEDD5",
  "#DCFCE7",
];

function NoteCard({ note, index, onView, onEdit, onDelete }) {
  return (
    <article
      style={{
        backgroundColor: noteColors[index % noteColors.length],
      }}
      className="flex min-h-56 flex-col rounded-3xl p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex-1">
        <h3 className="break-words text-lg font-bold">
          {note.title}
        </h3>

        <p className="mt-4 line-clamp-4 break-words text-sm leading-7 text-slate-600">
          {note.content}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/60 pt-4">
        <span className="text-xs text-slate-500">
          {formatDate(note.createdAt)}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onView(note)}
            title="مشاهده جزئیات"
            aria-label="مشاهده جزئیات"
            className="rounded-xl bg-white/70 p-2 text-violet-600 transition hover:bg-white"
          >
            <Eye size={17} />
          </button>

          <button
            type="button"
            onClick={() => onEdit(note)}
            title="ویرایش"
            aria-label="ویرایش یادداشت"
            className="rounded-xl bg-white/70 p-2 text-sky-700 transition hover:bg-white"
          >
            <Pencil size={17} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(note.id)}
            title="حذف"
            aria-label="حذف یادداشت"
            className="rounded-xl bg-white/70 p-2 text-rose-500 transition hover:bg-white"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;
