import { Attraction } from 'grommet-icons';
import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useAuth0 } from '@auth0/auth0-react';
import api from '../utils/api';

function Map() {
  const { user, isAuthenticated } = useAuth0();
  const [showPopup, togglePopup] = useState({});
  const [viewport, setViewport] = useState({
    latitude: 35.8283,
    longitude: -98.5795,
    width: '100vw',
    height: '100vh',
    zoom: 3.5,
    minzoom: 3.5,
  });

  const [allLocations, setAllLocations] = useState([]);
  const [campsite, setCampsite] = useState({
    title: '',
    rating: '',
    user: user ? user.sub : '',
    latitude: 0,
    longitude: 0,
  });

  const [newLocation, setNewLocation] = useState(null);
  const showNewMarker = e => {
    const [longitude, latitude] = e.lngLat;
    console.log(longitude, latitude);
    setNewLocation({
      latitude,
      longitude,
    });
    setCampsite({
      ...campsite,
      latitude: latitude,
      longitude: longitude,
    });
  };

  const loadSites = () => {
    api.loadCampsite().then(results => {
      setAllLocations(results.data);
    });
  };

  useEffect(() => {
    loadSites();
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setCampsite({
      ...campsite,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log('hellowWorld', campsite);
    api.saveCampsite(campsite).then(results => {
      console.log(results);
    });
    loadSites();
  }

  return (
    <div className='container-md'>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken='pk.eyJ1IjoidGhlY291bnRqcGMiLCJhIjoiY2trYTFlemZjMG02NTJ1cXc0ZXRwZzVtNCJ9.A-cvDeI0OcMzK_UpOhWS1A'
        mapStyle='mapbox://styles/thecountjpc/ckka2kjbs0w7t17plpz6hzqte'
        minZoom={3.5}
        doubleClickZoom={false}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
        onDblClick={showNewMarker}
      >
        {console.log(allLocations)}

        {allLocations.length > 0
          ? allLocations
              .filter(campsite => {
                return campsite.user === (user ? user.sub : '');
              })
              .map(campsite => {
                return (
                  <>
                    <Marker
                      key={campsite._id}
                      latitude={campsite.latitude}
                      longitude={campsite.longitude}
                      onClick={() => togglePopup({ [campsite._id]: true })}
                    >
                      <Attraction />
                    </Marker>
                    {showPopup[campsite._id] ? (
                      <Popup
                        latitude={campsite.latitude}
                        longitude={campsite.longitude}
                        closeButton={true}
                        closeOnClick={false}
                        dynamicPosition={true}
                        onClose={() => togglePopup({})}
                      >
                        <div>
                          <form
                          // onSubmit= {handleSubmit}
                          >
                            <label htmlFor='title'>Title</label>
                            <input
                              name='title'
                              onChange={handleInputChange}
                              value={campsite.title}
                            />
                            <label htmlFor='rating'>Rating</label>
                            <input
                              name='rating'
                              onChange={handleInputChange}
                              value={campsite.rating}
                            />
                            <button onClick={handleSubmit}>Set</button>
                          </form>
                        </div>
                      </Popup>
                    ) : null}
                  </>
                );
              })
          : ''}

        {newLocation ? (
          <>
            <Marker
              latitude={newLocation.latitude}
              longitude={newLocation.longitude}
            >
              <Attraction />
            </Marker>
            {showPopup && (
              <Popup
                latitude={newLocation.latitude}
                longitude={newLocation.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setNewLocation(null)}
              >
                <div>
                  <form
                  // onSubmit= {handleSubmit}
                  >
                    <label htmlFor='title'>Title</label>
                    <input
                      name='title'
                      onChange={handleInputChange}
                      value={newLocation.title}
                    />
                    <label htmlFor='rating'>Rating</label>
                    <input
                      name='rating'
                      onChange={handleInputChange}
                      value={newLocation.rating}
                    />
                    <button onClick={handleSubmit}>Set</button>
                  </form>
                </div>
              </Popup>
            )}
          </>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Map;
