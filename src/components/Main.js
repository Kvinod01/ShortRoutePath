import React from "react";
import { Routes, Route } from "react-router-dom";
import LocationSearch from "./LocationSearch";
import MapMarker from "./MapMarker";
import TagLine from "./TagLine";
import ShortestRoute from "./ShortestRoute";
import RouteMap from "./RouteMap";
import SignUp from "./SignUp";
import Login from "./Login";
import About from "./About";
function Main() {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div
              className="container-fluid text-center"
              style={{
                height: "100vh",
                width: "100%",
                paddingTop: "100px",
              }}
            >
              <TagLine />
            </div>
          }
        />
        <Route
          exact
          path="/about"
          element={
            <div
              className="container-fluid d-flex"
              style={{
                height: "100vh",
                width: "100%",
                paddingTop: "63px",
              }}
            >
              <About />
            </div>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <div
              className="container-fluid d-flex"
              style={{
                height: "100vh",
                width: "100%",
                paddingTop: "63px",
              }}
            >
              <Login />
            </div>
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <div
              className="container-fluid d-flex"
              style={{
                height: "100vh",
                width: "100%",
                paddingTop: "63px",
              }}
            >
              <SignUp />
            </div>
          }
        />
        <Route
          exact
          path="/waypoints"
          element={
            <div
              className="container-fluid d-flex"
              style={{
                height: "100vh",
                width: "100%",
                paddingTop: "63px",
              }}
            >
              <LocationSearch />
              <MapMarker />
            </div>
          }
        />
        <Route
          exact
          path="/route"
          element={
            <div
              className="container-fluid d-flex"
              style={{
                height: "100vh",
                width: "100%",
                paddingTop: "63px",
              }}
            >
              <ShortestRoute />
              <RouteMap />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default Main;
