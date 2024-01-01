import React, { useState, useContext } from "react";
import wayPointsContext from "../context/wayPointsContext";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
const LocationSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { waypoints, addWayPoint, deleteWayPoint } =
    useContext(wayPointsContext);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };
  const delWayPoints = (result) => {
    deleteWayPoint([result]);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      return;
    }
    const apiKey = "5d94847184414a7dbb25ec73adb023b7"; // Replace with your OpenCage Data API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      query
    )}&key=${apiKey}`;
    setLoading(true);
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setResults(data.results);
        }
      })
      .catch((error) => {
        console.log("Error searching for locations:", error);
      });
    setLoading(false);
  };

  return (
    <>
      <div
        className="container-fluid d-flex flex-column"
        style={{ padding: "60px" }}
      >
        <div className="container-fluid d-flex justify-content-center">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2 bg-secondary bg-opacity-75"
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Enter the source"
              aria-label="Search"
            />
            <button
              className="btn btn-secondary"
              type="submit"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
        {loading == true ? (
          <Spinner />
        ) : (
          <div
            className="container-fluid d-flex flex-column justify-content-center"
            style={{ height: "250px", width: "400px" }}
          >
            <ul
              className="d-flex flex-column text-light my-3"
              style={{
                display: "none",
                listStyleType: "none",
                padding: "0",
                margin: "0",
                maxHeight: "300px",
                maxWidth: "400px",
                overflowY: "scroll",
                scrollbarWidth: "none",
                scrollbarColor: "transparent transparent",
              }}
            >
              {results.map((result) => (
                <button
                  className="text-bg-secondary bg-opacity-50"
                  style={{
                    curser: "pointer",
                    padding: "2px",
                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    addWayPoint([
                      [
                        result.formatted,
                        result.geometry.lat,
                        result.geometry.lng,
                      ],
                    ]);
                  }}
                  key={result.geometry.lat + result.geometry.lng}
                >
                  {result.formatted}
                </button>
              ))}
            </ul>
          </div>
        )}
        <div
          className="container-fluid d-flex flex-column justify-content-center"
          style={{ height: "250px", width: "400px" }}
        >
          {waypoints.length != 0 ? (
            <h4 className="mx-5 text-white">Waypoints : </h4>
          ) : (
            <h5 className="text-black mx-5 bg-secondary bg-opacity-50 align-item-center">
              No elements to display
            </h5>
          )}
          <ul
            className="d-flex flex-column text-light my-3"
            style={{
              display: "none",
              listStyleType: "none",
              padding: "0",
              margin: "0",
              maxHeight: "300px",
              maxWidth: "400px",
              overflowY: "scroll",
              scrollbarWidth: "none",
              scrollbarColor: "transparent transparent",
            }}
          >
            {waypoints.map((result) => (
              <button
                className="text-bg-secondary bg-opacity-50"
                key={result[1] + result[2]}
                onClick={() => {
                  delWayPoints(result);
                }}
              >
                {result[0]}
              </button>
            ))}
          </ul>
        </div>
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
          {waypoints.length > 1 && (
            <button
              className="text-bg-primary bg-opacity-50"
              style={{ width: "300px" }}
            >
              <Link
                to="/route"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Click here to continue
              </Link>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LocationSearch;
