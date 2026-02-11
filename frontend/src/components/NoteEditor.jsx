import { useEffect, useState } from "react";
import API from "../api";

export default function NoteEditor({ note, onSaved,isMobile }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
  if (!note) {
    setTitle("");
    setContent("");
    setFile(null);
    return;
  }

  setTitle(note.title || "");
  setContent(note.content || "");
  setFile(null);
}, [note]);
 


  const saveNote = async () => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("file", file);

    const res = note
      ? await API.put(`/notes/${note._id}`, formData)
      : await API.post("/notes", formData);

    if (!res.data) {
      throw new Error("Note not saved");
    }

    setTitle("");
    setContent("");
    setFile(null);

    onSaved(); // 👈 refresh notes
  } catch (err) {
    console.error(err);
    alert("Failed to save note");
  }
};

  
  return (
    <div  style={{
    padding: "16px",
    scrollMarginBottom:"300px",
    backgroundColor: "#ffffff",
  }}>
      <h3>{note ? "Edit Note" : "Create Note"}</h3>

      <input  style={{ width: "100%" }}
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea 
        placeholder="Write your note..."
        rows="10"
        value={content}
        onChange={(e) => setContent(e.target.value)}
         style={{
    width: "100%" }}
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
          style={{
    width: "100%",
    padding: "8px",
    border: "1px solid #93c5fd",
    borderRadius: "5px",
  }}
      />

      <br /><br />
      <button onClick={saveNote} style={{
    
    color: "white",
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}>Save Note</button>
      {note && (
  
  <button
    onClick={async () => {
      try {
        await API.delete(`/notes/${note._id}`);
        alert("Note deleted");
        onSaved(null);   // 👈 important
      } catch (err) {
        console.error(err);
        alert("Delete failed");
      }
    }}
     style={{
    marginLeft: "10px",
    background: "#dc2626",
    color: "white",
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
  >
    Delete Note
  </button>
)}


      {note?.file && (
        <p>
          📎{" "}
          <a
            href={`https://mern-notes-backend-qzno.onrender.com/uploads/${note.file}`}
            target="_blank"
            rel="noreferrer"
              style={{ color: "#2563eb" }}
          >
            View File
          </a>
        </p>
      )}


    </div>

  );
}
