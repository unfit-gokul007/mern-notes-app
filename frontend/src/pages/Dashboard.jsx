import { useState, useEffect } from "react";
import API from "../api";
import NotesList from "../components/NotesList";
import NoteEditor from "../components/NoteEditor";
import { useNavigate } from "react-router-dom";







export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [search, setSearch] = useState("");
  



  const width = window.innerWidth;

const isMobile = width <= 640;     // phones
const isTablet = width > 640 && width <= 1024; // tablets
const isDesktop = width > 1024;   // laptops & desktops




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



  const filteredNotes = notes.filter((note) => {
  const title = note.title?.toLowerCase() || "";
  const content = note.content?.toLowerCase() || "";

  return (
    title.includes(search.toLowerCase()) ||
    content.includes(search.toLowerCase())
  );
});


const logout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};


  


  return (
    
    <div
     style={{
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    display: "flex",
    flexDirection: "column",
  }}
>

     <h2  style={{
    padding: "14px 20px",
    fontSize: isMobile ? "20px" : "24px",
    fontWeight: "bold",
    color: "#2563eb",
    borderBottom: "1px solid #93c5fd",
    textAlign: isMobile ? "center" : "left",
  }}>
  Easy Study
</h2>


  <div
    style={{
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    flex: 1,
    maxWidth: "1400px",     // prevents ultra-wide stretch
    margin: "0 auto",       // center on large screens
    width: "100%",
  }}
>


        <h3 style= {{
    width: isMobile
      ? "100%"
      : isTablet
      ? "40%"
      : "30%",
    padding: "12px",
    backgroundColor: "#f8fafc",
    borderRight: isMobile ? "none" : "2px solid #93c5fd",
    borderBottom: isMobile ? "2px solid #93c5fd" : "none",
    boxSizing: "border-box",
  }}>Your Notes</h3>


<div
  style={{
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "12px",
  }}
>


<input
  type="text"
  placeholder="Search notes..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    flex: 1,
      height: "42px",
      padding: "0 12px",
      borderRadius: "6px",
      border: "1px solid #93c5fd",
      outline: "none", }}
/>


        <button
  onClick={() => setSelectedNote(null)}
   style={{
      height: "42px",
      padding: "0 18px",
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
      whiteSpace: "nowrap",
  }}
>
  + New Note
</button>
</div>

<div style={{ marginTop: "4px" }}>
        <NotesList
          notes={filteredNotes}
          onSelect={setSelectedNote}
           isMobile={isMobile}
        /></div>
      

      <div
   style={{
    width: isMobile
      ? "100%"
      : isTablet
      ? "60%"
      : "70%",
    padding: "16px",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
  }}
></div>

        <NoteEditor
  note={selectedNote}
   isMobile={isMobile}
  onSaved={async (savedNoteId) => {
    const res = await API.get("/notes");
    setNotes(res.data);

    if (savedNoteId) {
      const updated = res.data.find(n => n._id === savedNoteId);
      setSelectedNote(updated || null);
    }
  }}
/>



<button onClick={logout}>Logout</button>



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
