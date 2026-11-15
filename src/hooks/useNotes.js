import { useState, useEffect, useCallback } from "react";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../services/noteService";

function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  // ساخت یادداشت جدید
  const addNote = async (noteData) => {
    const response = await createNote(noteData);

    await loadNotes();

    return response;
  };

  // ویرایش یادداشت
  const editNote = async (id, noteData) => {
    const response = await updateNote(id, noteData);

    await loadNotes();

    return response;
  };

  // حذف یادداشت
  const removeNote = async (id) => {
    const response = await deleteNote(id);

    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== id),
    );

    return response;
  };

  // دریافت جزئیات یک یادداشت
  const fetchNoteById = async (id) => {
    const data = await getNoteById(id);

    return data.response ?? data;
  };

  // دریافت یادداشت‌ها هنگام اجرای اولیه هوک
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return {
    notes,
    loading,
    error,
    loadNotes,
    addNote,
    editNote,
    removeNote,
    fetchNoteById,
  };
}

export default useNotes;
