import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  } catch (err) {
    alert("Login failed");
  }
};

  return (
   <center> <div className="container">
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p onClick={() => navigate("/signup")}>Create account</p>
    </div></center>
  );
}
