
import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";


function Map() {
  const [showPopup, togglePopup] = React.useState(true);
  const [viewport, setViewport] = useState({
    latitude: 39.8283,
    longitude: -91.5795,
    width: "100vw",
    height: "100vh",
    zoom: 3.5,
  });
  const [newLocation, setNewLocation] = useState(null);
const showNewMarker = (e) => {
    const [longitude, latitude] = e.lngLat;
    console.log(longitude,latitude)
    setNewLocation({
      latitude,
      longitude,
    });
  };

  function handleSubmit (e) {
    e.preventDefault()
   console.log("hellowWorld")
  }

  return (
    <div className="container-md">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoidGhlY291bnRqcGMiLCJhIjoiY2trYTFlemZjMG02NTJ1cXc0ZXRwZzVtNCJ9.A-cvDeI0OcMzK_UpOhWS1A"
        mapStyle="mapbox://styles/thecountjpc/ckka2kjbs0w7t17plpz6hzqte"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        onDblClick={showNewMarker}

      >
        <Marker latitude={33.4484} longitude={-112.074}>
          <div>
            <i className="fas fa-campground"></i>
          </div>
        </Marker>
        {newLocation ? (
          <>
       <Marker latitude={newLocation.latitude} longitude={newLocation.longitude}>
          <div>
            <i className="fas fa-campground"></i>
          </div>
        </Marker>
        {showPopup && <Popup
          latitude={newLocation.latitude}
          longitude={newLocation.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => togglePopup(false)}
          anchor="top" >
           <div>
            <form 
            // onSubmit= {handleSubmit}
            >
            <label htmlFor="title">Title</label>
            <input name="title"/>
            <label htmlFor="rating">Rating</label>
            <input name="rating"/>
              <button onClick={handleSubmit}>Set </button>
            </form>
          </div>
        </Popup>}
        </>

        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Map;
