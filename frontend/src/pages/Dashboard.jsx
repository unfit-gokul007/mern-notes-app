import { useState } from "react";
import NotesList from "../components/NotesList";
import NoteEditor from "../components/NoteEditor";

export default function Dashboard() {
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "30%", borderRight: "1px solid #ffd700", padding: "10px" }}>
        <h3>Your Notes</h3>
        <NotesList onSelect={setSelectedNote} />
      </div>

      <div style={{ width: "70%", padding: "10px" }}>
        <NoteEditor note={selectedNote} />
      </div>
    </div>
  );
}
