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
    backgroundColor: "#ffffff",
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
<li><h1>Search Note</h1> <input  
  type="text"
  placeholder="Search notes..."
  value={search} 
  onChange={(e) => setSearch(e.target.value)}
  style={{
    color:"#030711",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "6px",
    width: "10%",
    fontWeight:"bold",
    
  }}
/>
<button
  onClick={() => setSelectedNote(null)}
   style={{
    padding: "8px 14px",
    width: "100px",
    fontWeight: "bold",
    boxSizing: "border-box",
    cursor: "pointer",
  }}
>
  + New Note
</button>

</li>


            <div style={{paddingLeft:"950px"}}> <h1>Your Notes</h1>
    <NotesList notes={filteredNotes} onSelect={setSelectedNote}/>
      </div>
  </div>

        

      <div
  style={{
    width: "70%",
    padding: "16px",
    color: "#030711",
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
