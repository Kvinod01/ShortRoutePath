import React from "react";

function Spinner() {
  return (
    <div
      className="container-fluid text-center"
      style={{ margin: "auto auto" }}
    >
      <div
        className="container-fluid spinner-border text-tertiary"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
