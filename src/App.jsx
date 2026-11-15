import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  NotebookPen,
  RefreshCw,
  Eye,
  ArrowUpDown,
} from "lucide-react";

import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "./services/noteService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const noteColors = [
  "#FCE7F3",
  "#EDE9FE",
  "#FEF3C7",
  "#E0F2FE",
  "#FFEDD5",
  "#DCFCE7",
];

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [newestFirst, setNewestFirst] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [deleteNoteId, setDeleteNoteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  // دریافت یادداشت‌ها از سرور
  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getNotes();
      setNotes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("دریافت یادداشت‌ها با مشکل مواجه شد");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // باز کردن فرم ساخت یادداشت
  function openCreateForm() {
    setEditingNote(null);
    setTitle("");
    setContent("");
    setIsFormOpen(true);
  }

  // باز کردن فرم ویرایش یادداشت
  function openEditForm(note) {
    setEditingNote(note);
    setTitle(note.title || "");
    setContent(note.content || "");
    setIsFormOpen(true);
  }

  // بستن فرم
  function closeForm() {
    setIsFormOpen(false);
    setEditingNote(null);
    setTitle("");
    setContent("");
  }

  // ساخت یا ویرایش یادداشت
  async function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanContent = content.trim();

  // بررسی خالی نبودن عنوان
  if (!cleanTitle) {
    toast.error("لطفاً عنوان یادداشت را وارد کنید");
   return;
  }

  // بررسی حداقل طول عنوان
  if (cleanTitle.length < 3) {
   toast.error("عنوان یادداشت باید حداقل ۳ کاراکتر باشد");
   return;
  }

  if (cleanContent.length > 100) {
   toast.error("توضیحات نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد");
   return;
  }

  // بررسی حداکثر طول عنوان
  if (cleanTitle.length > 100) {
   toast.error("عنوان یادداشت نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد");
   return;
  }

  // بررسی خالی نبودن توضیحات
  if (!cleanContent) {
   toast.error("لطفاً توضیحات یادداشت را وارد کنید");
   return;
  }

  // بررسی حداقل طول توضیحات
  if (cleanContent.length < 10) {
   toast.error("توضیحات یادداشت باید حداقل ۱۰ کاراکتر باشد");
   return;
  }

    const noteData = {
      title: cleanTitle,
      content: cleanContent,
    };

    try {
      setSaving(true);

      if (editingNote) {
        await updateNote(editingNote.id, noteData);
        toast.success("یادداشت با موفقیت ویرایش شد");
      } else {
        await createNote(noteData);
        toast.success("یادداشت جدید ساخته شد");
      }

      closeForm();
      await loadNotes();
    } catch (err) {
      toast.error("ذخیره یادداشت انجام نشد");
    } finally {
      setSaving(false);
    }
  }

  // حذف یادداشت
function handleDelete(id) {
  setDeleteNoteId(id);
}
async function confirmDelete() {
  if (!deleteNoteId) return;

  try {
    setDeleteLoading(true);

    await deleteNote(deleteNoteId);

    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== deleteNoteId),
    );

    if (selectedNote?.id === deleteNoteId) {
      setSelectedNote(null);
    }

    toast.success("یادداشت حذف شد");
    setDeleteNoteId(null);
  } catch (err) {
    toast.error("حذف یادداشت انجام نشد");
  } finally {
    setDeleteLoading(false);
  }
}

  // دریافت جزئیات یک یادداشت از سرور
  async function handleViewNote(note) {
    setSelectedNote(note);
    setDetailsLoading(true);

    try {
      const data = await getNoteById(note.id);

      const noteDetails = data.response ?? data;

      setSelectedNote(noteDetails);
    } catch (error) {
      toast.error("دریافت جزئیات یادداشت انجام نشد");
    } finally {
      setDetailsLoading(false);
    }
  }

  // جستجو و مرتب‌سازی یادداشت‌ها
  const filteredNotes = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    const result = notes.filter((note) => {
      const noteTitle = note.title || "";
      const noteContent = note.content || "";

      return `${noteTitle} ${noteContent}`.toLowerCase().includes(searchText);
    });

    return result.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();

      return newestFirst ? dateB - dateA : dateA - dateB;
    });
  }, [notes, search, newestFirst]);

  return (
    <div dir="rtl" className="min-h-screen bg-[#FFF9FC] text-slate-800">
      <ToastContainer position="top-left" autoClose={2500} rtl theme="light" />

      {/* Header */}
      <header className="border-b border-pink-100 bg-white px-5 py-6 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-violet-600">
              Think Board
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              فضایی برای ثبت ایده‌ها و یادداشت‌های تو
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="flex items-center gap-2 rounded-2xl bg-violet-500 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-violet-600"
          >
            <Plus size={19} />
            یادداشت جدید
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 md:px-12">
        {/* Page title */}
        <section className="mb-8">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            یادداشت‌های من
          </h2>

          <p className="mt-3 text-slate-500">{notes.length} یادداشت ثبت شده</p>
        </section>

        {/* Search and sort */}
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-3 rounded-2xl border border-pink-100 bg-white px-4 py-3 sm:max-w-md">
            <Search size={20} className="shrink-0 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="جستجو در یادداشت‌ها"
              className="w-full bg-transparent text-right outline-none placeholder:text-slate-400"
            />
          </div>

          <button
            type="button"
            onClick={() => setNewestFirst((previous) => !previous)}
            className="flex items-center justify-center gap-2 rounded-2xl border border-pink-100 bg-white px-4 py-3 text-sm transition hover:bg-pink-50"
          >
            <ArrowUpDown size={17} />
            {newestFirst ? "جدیدترین یادداشت‌ها" : "قدیمی‌ترین یادداشت‌ها"}
          </button>
        </section>

        {/* Loading state */}
        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-52 animate-pulse rounded-3xl bg-pink-100"
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="rounded-3xl border border-rose-200 bg-white p-10 text-center">
            <p className="mb-5 text-rose-500">{error}</p>

            <button
              type="button"
              onClick={loadNotes}
              className="mx-auto flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-white hover:bg-violet-600"
            >
              <RefreshCw size={17} />
              تلاش دوباره
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredNotes.length === 0 && (
          <div className="rounded-3xl border-2 border-dashed border-pink-200 bg-white/80 px-5 py-16 text-center">
            <NotebookPen size={42} className="mx-auto mb-5 text-violet-400" />

            <h3 className="text-xl font-bold">
              {search ? "یادداشتی پیدا نشد" : "هنوز یادداشتی ثبت نکرده‌ای"}
            </h3>

            <p className="mt-3 text-sm text-slate-400">
              {search
                ? "عبارت دیگری را برای جستجو امتحان کن"
                : "اولین یادداشتت را بساز"}
            </p>
          </div>
        )}

        {/* Notes list */}
        {!loading && !error && filteredNotes.length > 0 && (
          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note, index) => (
              <article
                key={note.id}
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
                      onClick={() => handleViewNote(note)}
                      title="مشاهده جزئیات"
                      aria-label="مشاهده جزئیات"
                      className="rounded-xl bg-white/70 p-2 text-violet-600 transition hover:bg-white"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditForm(note)}
                      title="ویرایش"
                      aria-label="ویرایش یادداشت"
                      className="rounded-xl bg-white/70 p-2 text-sky-700 transition hover:bg-white"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(note.id)}
                      title="حذف"
                      aria-label="حذف یادداشت"
                      className="rounded-xl bg-white/70 p-2 text-rose-500 transition hover:bg-white"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      {/* Create and edit modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl md:p-8"
          >
            <div className="mb-7 flex items-center justify-between">
              <h3 className="text-xl font-bold text-violet-700">
                {editingNote ? "ویرایش یادداشت" : "ساخت یادداشت جدید"}
              </h3>

              <button
                type="button"
                onClick={closeForm}
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
              onChange={(event) => setTitle(event.target.value)}
              placeholder="عنوان یادداشت را وارد کن"
              maxLength={100}
              required
              className="mb-5 w-full rounded-2xl border border-pink-100 bg-[#FFFAFC] px-4 py-3 text-right outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
            />

            <div className="mb-5 mt-2 flex justify-start text-xs text-slate-400">
              <span>{100 - title.length}/100</span>
            </div>

            <label className="mb-2 block text-sm font-semibold">توضیحات</label>

            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="متن یادداشت را وارد کن"
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
                onClick={closeForm}
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
      )}

      {/* Note details modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4">
          <div className="my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-violet-700">
                جزئیات یادداشت
              </h3>

              <button
                type="button"
                onClick={() => setSelectedNote(null)}
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
               ) : (<>
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
              onClick={() => setSelectedNote(null)}
              className="mt-6 rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-600"
            >
              بستن
            </button>
          </div>
        </div>
      )}
            {/* Delete confirmation modal */}
      {deleteNoteId && (
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
                onClick={confirmDelete}
                disabled={deleteLoading}
                className="flex-1 rounded-xl bg-rose-500 px-5 py-3 font-semibold text-white transition hover:bg-rose-600 disabled:opacity-50"
              >
                {deleteLoading ? "در حال حذف" : "حذف یادداشت"}
              </button>

              <button
                type="button"
                onClick={() => setDeleteNoteId(null)}
                disabled={deleteLoading}
                className="flex-1 rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-200 disabled:opacity-50"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
