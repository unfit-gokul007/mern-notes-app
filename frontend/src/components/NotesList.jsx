export default function NotesList({ notes, onSelect }) {
  if (!notes || notes.length === 0) {
    return <p>No notes yet</p>;
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
            border: "1px solid #ffd700",
            background: "#111",
            color: "#ffd700"
          }}
        >
          <strong>{note.title || "Untitled"}</strong>
        </div>
      ))}
    </div>
  );
}
