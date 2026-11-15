import { useMemo, useState } from "react";
import Header from "./components/Header";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import NoteDetails from "./components/NoteDetails";
import DeleteConfirm from "./components/DeleteConfirm";
import NoteSkeleton from "./components/NoteSkeleton";
import EmptyState from "./components/EmptyState";
import useNotes from "./hooks/useNotes";
import validateNote from "./utils/validateNote";
import NoteToolbar from "./components/NoteToolbar";

import { RefreshCw } from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
const {
  notes,
  loading,
  error,
  loadNotes,
  addNote,
  editNote,
  removeNote,
  fetchNoteById,
} = useNotes();

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

   const validationError = validateNote(title, content);

    if (validationError) {
     toast.error(validationError);
     return;
    }

    const noteData = {
      title: cleanTitle,
      content: cleanContent,
    };

    try {
      setSaving(true);

      if (editingNote) {
        await editNote(editingNote.id, noteData);
        toast.success("یادداشت با موفقیت ویرایش شد");
      } else {
        await addNote(noteData);
        toast.success("یادداشت جدید ساخته شد");
      }

      closeForm();
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

    await removeNote(deleteNoteId);

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
      const noteDetails = await fetchNoteById(note.id);

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

      <Header onCreateNote={openCreateForm} />

      <main className="mx-auto max-w-7xl px-5 py-10 md:px-12">
        {/* Page title */}
        <section className="mb-8">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            یادداشت‌های من
          </h2>

          <p className="mt-3 text-slate-500">{notes.length} یادداشت ثبت شده</p>
        </section>

        {/* Search and sort */}
        <NoteToolbar
          search={search}
          onSearchChange={setSearch}
          newestFirst={newestFirst}
          onToggleSort={() =>
           setNewestFirst((previous) => !previous)
          }
        />

        {/* Loading state */}
        {loading && <NoteSkeleton />}

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
          <EmptyState
            search={search}
            onCreateNote={openCreateForm}
          />
        )}

        {/* Notes list */}
        {!loading && !error && filteredNotes.length > 0 && (
         <NoteList
           notes={filteredNotes}
           onView={handleViewNote}
           onEdit={openEditForm}
           onDelete={handleDelete}
         />
       )}
 
      </main>

      {/* Create and edit modal */}
      {isFormOpen && (
        <NoteForm
         editingNote={editingNote}
         title={title}
         content={content}
         saving={saving}
         onTitleChange={setTitle}
         onContentChange={setContent}
         onSubmit={handleSubmit}
         onClose={closeForm}
        />
      )}

      {/* Note details modal */}
      {selectedNote && (
        <NoteDetails
          selectedNote={selectedNote}
          detailsLoading={detailsLoading}
          onClose={() => setSelectedNote(null)}
        />
      )} 

      {/* Delete confirmation modal */}
      {deleteNoteId && (
        <DeleteConfirm
          deleteLoading={deleteLoading}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteNoteId(null)}
        />
      )}
    </div>
  );
}

export default App;
