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
 
<div> 
<input  
  type="text"
  placeholder="Search notes..."
  value={search} 
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding: "8px",
    color: "#2563eb",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #93c5fd",
    width: "10%",
  }}
/>

<button
  onClick={() => setSelectedNote(null)}
   style={{
    width: "95px",
    padding: "10px",
    background: "#2563eb",
    fontWeight: "bold",
    boxSizing: "border-box",
    cursor: "pointer",
  }}
>
  + New Note
</button>


<h3 style= {{
    padding: "10px",
    color: "#2563eb",
    backgroundColor: "#f8fafc",
    borderRight: isMobile ? "none" : "2px solid #93c5fd",
    borderBottom: isMobile ? "2px solid #93c5fd" : "none",
    boxSizing: "border-box",
  }}>Your Notes</h3>
    <NotesList notes={filteredNotes} onSelect={setSelectedNote}/>
      
  </div>

        

      <div
  style={{
    width: "70%",
    padding: "16px",
    color: "#030711",
    backgroundColor: "#08b3f7",
  }}
>

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

<div><button onClick={logout}  style={{background: "#eb0d0d",
    color: "white",
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",}} >Logout </button></div>



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
