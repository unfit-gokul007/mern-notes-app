import { useState, useEffect } from "react";
import API from "../api";
import NotesList from "../components/NotesList";
import NoteEditor from "../components/NoteEditor";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "30%", borderRight: "1px solid #ffd700", padding: "10px" }}>
        <h3>Your Notes</h3>

        <button
  onClick={() => setSelectedNote(null)}
  style={{
    width: "100%",
    marginBottom: "10px",
    padding: "8px",
    background: "#ffd700",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  + New Note
</button>

        <NotesList
          notes={notes}
          onSelect={setSelectedNote}
        />
      </div>

      <div style={{ width: "70%", padding: "10px" }}>
        <NoteEditor
  note={selectedNote}
  onSaved={async (savedNoteId) => {
    const res = await API.get("/notes");
    setNotes(res.data);

    if (savedNoteId) {
      const updated = res.data.find(n => n._id === savedNoteId);
      setSelectedNote(updated || null);
    }
  }}
/>
      </div>
    </div>
  );
}
