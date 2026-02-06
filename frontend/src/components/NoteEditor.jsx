import { useEffect, useState } from "react";
import API from "../api";

export default function NoteEditor({ note, onSaved }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
      setFile(null);
    }
  }, [note]);

  if (onSaved) {
  onSaved();
}

  const saveNote = async () => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  if (file) formData.append("file", file);

  if (note) {
    await API.put(`/notes/${note._id}`, formData);
  } else {
    await API.post("/notes", formData);
  }

  alert("Note saved");
  onSaved();
};
  const deleteNote = async () => {
    try {
      await API.delete(`/notes/${note._id}`);
      alert("🗑️ Note deleted");
      if (onSaved) onSaved();
    } catch (err) {
      alert("❌ Failed to delete note");
      console.error(err);
    }
  };

  return (
    <div>
      <h3>{note ? "Edit Note" : "Create Note"}</h3>

      <input
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note..."
        rows="10"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ marginTop: "10px" }}
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginTop: "10px" }}
      />

      <br /><br />
      <button onClick={saveNote}>Save Note</button>

      {note && (
        <button
          onClick={deleteNote}
          style={{ marginLeft: "10px", background: "red", color: "white" }}
        >
          Delete Note
        </button>
      )}

      {note?.file && (
        <p>
          📎{" "}
          <a
            href={`https://mern-notes-backend-qzno.onrender.com/${note.file}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#ffd700" }}
          >
            View File
          </a>
        </p>
      )}
    </div>
  );
}
