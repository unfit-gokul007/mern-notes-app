import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await API.post("/auth/signup", {
      email,
      password,
    });
    navigate("/login");
  } catch (err) {
    alert("Signup failed");
    console.error(err);
  }
};

  return (
    <center><div className="container">
      <h2>Signup</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Signup</button>
    </div></center>
  );
}
