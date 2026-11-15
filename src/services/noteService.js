
import api from "./api";

// دریافت همه یادداشت‌ها
export async function getNotes() {
  const response = await api.get("/notes");

  if (!response.data.success) {
    throw new Error("دریافت یادداشت‌ها ناموفق بود.");
  }

  return response.data.response;
}

// ساخت یادداشت جدید
export async function createNote(noteData) {
  const response = await api.post("/notes", noteData);
  return response.data;
}

// ویرایش یادداشت
export async function updateNote(id, noteData) {
  const response = await api.put(`/notes/${id}`, noteData);
  return response.data;
}

// حذف یادداشت
export async function deleteNote(id) {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
}

// دریافت جزئیات یک یادداشت
export async function getNoteById(id) {
  const response = await api.get(`/notes/${id}`);
  return response.data;
}
