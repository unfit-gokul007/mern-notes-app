export default function NotesList({ notes, onSelect,isMobile }) {
  if (!notes || notes.length === 0) {
    return <p style={{ color: "#64748b" }}>No notes yet</p>;
  }

  return (
    <div>
      {notes.map(note => (
        <div
          key={note._id}
          onClick={() => onSelect(note)}
            style={{color:"#030711"}}
        >
          <strong>{note.title || "Untitled"}</strong>
        </div>
      ))}
    </div>
  );
}
