import { useEffect, useState } from "react";
import API from "../api";

export default function NotesList({ onSelect }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    API.get("/notes")
      .then(res => setNotes(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {notes.map(note => (
        <p
          key={note._id}
          style={{ cursor: "pointer" }}
          onClick={() => onSelect(note)}
        >
          📒 {note.title || "Untitled"}
        </p>
      ))}
    </div>
  );
}
