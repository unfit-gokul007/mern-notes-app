export default function NotesList({ notes, onSelect }) {
  if (!notes || notes.length === 0) {
    return <p style={{ color: "#64748b" }}>No notes yet</p>;
  }

  return (
    <div>
      {notes.map(note => (
        <div
          key={note._id}
          onClick={() => onSelect(note)}
           style={{
    padding: "10px",
    marginBottom: "8px",
    cursor: "pointer",
    border: "1px solid #93c5fd",
    borderRadius: "6px",
    background: "#ffffff",
    color: "#1e3a8a",
  }}
        >
          <strong>{note.title || "Untitled"}</strong>
        </div>
      ))}
    </div>
  );
}
