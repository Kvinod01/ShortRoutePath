import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          navigate("/waypoints"); // Navigate to the home
        } else if (data.error === "User not found") {
          alert("User not found");
        } else {
          alert("Invalid Password");
        }
      });
  }
  return (
    <div
      className="container text-center"
      style={{
        margin: "auto auto",
        color: "whitesmoke",
        opacity: "0.90",
      }}
    >
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="container border p-4"
          style={{ maxWidth: "400px", margin: "auto" }}
        >
          <h3 className="mb-4 text-center">Sign In</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ height: "30px" }}
              />
            </div>
            <div className="form-group my-3">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ height: "30px" }}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                <strong>Sign In</strong>
              </button>
            </div>
          </form>
          <p className="forgot-password text-center mt-3 text-bg-secondary">
            <strong>Don't have an account ?&nbsp;</strong>
            <Link to="/signup" style={{ color: "inherit" }}>
              <strong>Sign Up</strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
