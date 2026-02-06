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

        <NotesList
          notes={notes}
          onSelect={setSelectedNote}
        />
      </div>

      <div style={{ width: "70%", padding: "10px" }}>
        <NoteEditor
          note={selectedNote}
          onSaved={() => {
            setSelectedNote(null);
            fetchNotes();
          }}
        />
      </div>
    </div>
  );
}
