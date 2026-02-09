import { useState, useEffect } from "react";
import API from "../api";
import NotesList from "../components/NotesList";
import NoteEditor from "../components/NoteEditor";
import { useNavigate } from "react-router-dom";







export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);


const navigate = useNavigate(); // ✅ INSIDE component

  // ✅ Protect dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);




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


const logout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};


  


  return (
    
    <div
  style={{
    display: "flex",
    height: "100vh",
    backgroundColor: "#ffffff",
    color: "#0f172a",
  }}
>

     <h2 style={{ color: "#2563eb", marginBottom: "10px" }}>
  Easy Study
</h2>


  <button
    onClick={logout}
    style={{
      background: "#dc2626",
      color: "#ffffff",
      border: "none",
      padding: "8px 10px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Logout
  </button>




  <div
  style={{
    width: "30%",
    borderRight: "2px solid #93c5fd",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f8fafc",
  }}
>


        <h3 style={{ color: "#2563eb" }}>Your Notes</h3>


        <button
  onClick={() => setSelectedNote(null)}
   style={{
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
    background: "#2563eb",
    color: "#ffffff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  + New Note
</button>

        <NotesList
          notes={notes}
          onSelect={setSelectedNote}
        />
      </div>

      <div
  style={{
    width: "70%",
    padding: "16px",
    backgroundColor: "#ffffff",
  }}
>

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
      <div style={{ marginTop: "auto", paddingTop: "20px" }}>
  <a
    href="https://www.instagram.com/unfit_gokul"
    target="_blank"
    rel="noreferrer"
     style={{
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "bold",
    }}
  >
    📸 Follow me on Instagram
  </a>
</div>

    </div>
  );
}
