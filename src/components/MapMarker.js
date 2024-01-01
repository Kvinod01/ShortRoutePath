import React, { useEffect, useRef, useState, useContext } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import wayPointsContext from "../context/wayPointsContext";

const MapMarker = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const { waypoints } = useContext(wayPointsContext);
  const defaultIcon = new L.icon({
    iconUrl: require("../../node_modules/leaflet/dist/images/marker-icon.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -2],
  });
  useEffect(() => {
    // Initialize Leaflet map
    const leafletMap = L.map(mapContainerRef.current).setView(
      [20.5937, 78.9629],
      5
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(leafletMap);
    setMap(leafletMap);

    // Adjust map size when the window is resized
    const resizeMap = () => {
      leafletMap.invalidateSize();
    };
    window.addEventListener("resize", resizeMap);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("resize", resizeMap);
      leafletMap.remove();
    };
  }, []);
  useEffect(() => {
    const temp = map;
    if (temp)
      temp.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
          temp.removeLayer(layer);
        }
      });
    if (map && waypoints.length > 0) {
      waypoints.forEach((ele) => {
        L.marker([ele[1], ele[2]], { icon: defaultIcon }).addTo(temp);
      });
      setMap(temp);
    }
  }, [waypoints]);

  return (
    <div
      className="container-fluid d-flex"
      ref={mapContainerRef}
      style={{
        width: "100%",
        border: "1px solid #ccc",
        boxShadow: "0 0 4px #ccc, 0 0 8px #ccc, 0 0 12px #ccc, 0 0 16px #ccc",
        borderRadius: "5px",
      }}
    ></div>
  );
};

export default MapMarker;
