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
            style={{
    width: isMobile ? "100%" : "30%",
    borderRight: isMobile ? "none" : "2px solid #93c5fd",
    borderBottom: isMobile ? "2px solid #93c5fd" : "none",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f8fafc",
  }}
        >
          <strong>{note.title || "Untitled"}</strong>
        </div>
      ))}
    </div>
  );
}
