import React, { useState } from "react";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import AppButton from "./AppButton";

const CustomMap = () => {
  // shows marker on London by default
  const [selectedLocation, setSelectedLocation] = useState({});

  const [listOfLocations, setListOfLocations] = useState([]);

  const [markerLocation, setMarkerLocation] = useState({
    lat: 51.509865,
    lng: -0.118092,
  });

  const [showDialog, setShowDialog] = useState(false);

  const [dialogLocation, setDialogLocation] = useState("");

  const handleMapClick = (mapProps) => {
    if (mapProps.detail.placeId) {
      const lat = mapProps.detail.latLng.lat();
      const lng = mapProps.detail.latLng.lng();
      setShowDialog(true);
      setDialogLocation({ lat, lng });
      setSelectedLocation({ lat, lng });
    } else {
      alert("Please select a location from the map.");
    }
  };

  const onAddLocation = () => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: selectedLocation }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          setListOfLocations([
            ...listOfLocations,
            { name: results[0].formatted_address, location: selectedLocation },
          ]);
          setShowDialog(false);
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  const onViewLocation = (loc) => {
    setMarkerLocation({ lat: loc.lat, lng: loc.lng });
  };

  const onDeleteLocation = (loc) => {
    let updatedList = listOfLocations.filter(
      (l) => loc.lat !== l.location.lat && loc.lng !== l.location.lng
    );
    setListOfLocations(updatedList);
  };

  const exportLocations = () => {
    const data = JSON.stringify(listOfLocations);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "locations.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const importLocations = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const importedData = JSON.parse(e.target.result);
      console.log(
        "importedData",
        importedData,
        "listOfLocations",
        listOfLocations
      );
      setListOfLocations([...listOfLocations, ...importedData]);
    };
    reader.readAsText(file);
  };

  return (
    <div className="map-container">
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ borderRadius: "20px" }}
          defaultZoom={13}
          defaultCenter={markerLocation}
          gestureHandling={"greedy"}
          disableDefaultUI
          onClick={(mapProps) => handleMapClick(mapProps)}
        >
          {showDialog && (
            <InfoWindow position={dialogLocation}>
              <button className="app-button" onClick={onAddLocation}>
                Add this locatoin
              </button>
            </InfoWindow>
          )}
          <Marker position={markerLocation} />
        </Map>
      </APIProvider>

      <div className="list-container">
        {listOfLocations.length > 0 ? (
          <div>
            <p className="list-heading">List of selected locations</p>
            {listOfLocations.map((loc) => {
              return (
                <div
                  key={loc.location.lat + loc.location.lng}
                  className="list-item"
                >
                  <p className="latLng-text">{loc.name}</p>
                  <div style={{ display: "flex" }}>
                    <AppButton handleClick={() => onViewLocation(loc.location)}>
                      View
                    </AppButton>
                    <AppButton
                      handleClick={() => onDeleteLocation(loc.location)}
                    >
                      Delete
                    </AppButton>
                  </div>
                </div>
              );
            })}
            ;
            <div className="list-footer">
              <AppButton handleClick={exportLocations}>
                Export Locations
              </AppButton>
              <input
                className="app-button"
                type="file"
                accept=".json"
                onChange={importLocations}
              />
            </div>
          </div>
        ) : (
          <div>
            <p className="list-heading">
              Select a location from map to show in a list or upload a JSON file
              to import locations.
            </p>
            <div className="list-footer">
              <input
                className="app-button"
                type="file"
                accept=".json"
                onChange={importLocations}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomMap;
