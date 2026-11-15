import NoteCard from "./NoteCard";

function NoteList({ notes, onView, onEdit, onDelete }) {
  return (
    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note, index) => (
        <NoteCard
          key={note.id}
          note={note}
          index={index}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default NoteList;
