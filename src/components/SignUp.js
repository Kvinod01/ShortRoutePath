import React, { useState } from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    const validationErrors = {};

    if (!firstName.trim()) {
      validationErrors.firstName = "Please provide your first name.";
    }

    if (!lastName.trim()) {
      validationErrors.lastName = "Please provide your last name.";
    }

    if (!email.trim()) {
      validationErrors.email = "Please provide your email address.";
    }

    if (!password.trim()) {
      validationErrors.password = "Please provide a password.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Submit the form data
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname: firstName,
          lname: lastName,
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            // Registration successful
            alert("Registration successful!");
          } else if (data.error === "User Exists") {
            // User already exists
            alert("User already exists.");
          } else {
            // Error occurred
            alert("Error occurred. Please try again.");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Error occurred. Please try again.");
        });
    }
  };

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
        <div className="container border p-4" style={{ maxWidth: "400px" }}>
          <h3 className="text-center mb-4">
            <strong>Sign Up</strong>
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <input
                type="text"
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                id="inputFirstName"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ height: "30px" }}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>
            <div className="form-group my-3">
              <input
                type="text"
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                id="inputLastName"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ height: "30px" }}
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>
            <div className="form-group my-3">
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="inputEmail"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ height: "30px" }}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group my-3">
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="inputPassword"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ height: "30px" }}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="d-flex justify-content-center my-3">
              <button type="submit" className="btn btn-primary">
                <strong>Sign Up</strong>
              </button>
            </div>
          </form>
          <p className="mt-3 text-center text-bg-secondary">
            <strong>Already have an account ?&nbsp;</strong>{" "}
            <Link to="/login" style={{ color: "inherit" }}>
              <strong>Sign In</strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
