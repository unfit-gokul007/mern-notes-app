import { useEffect, useState } from "react";
import API from "../api";

export default function NoteEditor({ note }) {
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

  const saveNote = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) {
      formData.append("file", file);
    }

    if (note) {
      await API.put(`/notes/${note._id}`, formData);
    } else {
      await API.post("/notes", formData);
    }

    window.location.reload();
  };

  return (
    <div>
      <h3>{note ? "Edit Note" : "Create Note"}</h3>

      <input
        placeholder="Note title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note..."
        rows="10"
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ marginTop: "10px" }}
      />

      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
        style={{ marginTop: "10px" }}
      />

      <br /><br />
      <button onClick={saveNote}>Save Note</button>
                             <button onClick={saveNote}>Save Note</button>

{note && (
  <button
    onClick={async () => {
      await API.delete(`/notes/${note._id}`);
      window.location.reload();
    }}
    style={{ marginLeft: "10px", background: "red", color: "white" }}
  >
    Delete Note
  </button>
)}

      {note?.file && (
        <p>
          📎{" "}
          <a
            href={`http://localhost:5000/${note.file}`}
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
