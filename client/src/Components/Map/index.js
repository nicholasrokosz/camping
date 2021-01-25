import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "./style.css";

function App() {
  const [viewport, setViewport] = useState({
    latitude: 33.4484,
    longitude: -112.074,
    width: "80vw",
    height: "80vh",
    zoom: 10,
  });

  return (
    <div className="container-md shadow-lg mt-4">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoidGhlY291bnRqcGMiLCJhIjoiY2trYTFlemZjMG02NTJ1cXc0ZXRwZzVtNCJ9.A-cvDeI0OcMzK_UpOhWS1A"
        mapStyle="mapbox://styles/thecountjpc/ckka2kjbs0w7t17plpz6hzqte"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
       <Marker latitude={33.4484} longitude={-112.074}>
          <div>
            <i class="fas fa-campground"></i>
          </div>
        </Marker>
        <Popup latitude={33.4484} longitude={-112.074} offsetTop={-40}>
          <div>CAMPGROUND NAME HERE</div>
        </Popup>
      </ReactMapGL>
    </div>
  );
}

export default App;