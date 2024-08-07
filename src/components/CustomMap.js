import React, { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import PetsIcon from "@mui/icons-material/Pets";

const CustomMap = () => {
  // shows Joensuu by default
  const [markerLocation] = useState({
    lat: 62.60070051849284,
    lng: 29.765676378954662,
  });

  const Pin = PetsIcon;

  const location = [
    {
      key: "Avaarannan koirapuisto",
      location: { lat: 62.6139119100737, lng: 29.694705008595786 },
    },

    {
      key: "Koivuniemen koirapuisto",
      location: { lat: 62.59454388151994, lng: 29.745074788224024 },
    },

    {
      key: "Niinivaaran koirapuisto",
      location: { lat: 62.59470190717925, lng: 29.783526935009917 },
    },

    {
      key: "Koirametsä Vekkula",
      location: { lat: 62.66519627875552, lng: 29.512561231940342 },
    },
  ];
  const PoiMarkers = (props) => {
    return (
      <>
        {props.pois.map((poi) => (
          <AdvancedMarker key={poi.key} position={poi.location}>
            <Pin
              background={"#FBBC04"}
              glyphColor={"#000"}
              borderColor={"#000"}
            />
          </AdvancedMarker>
        ))}
      </>
    );
  };

  return (
    <div className="map-container">
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ borderRadius: "20px" }}
          defaultZoom={13}
          defaultCenter={{ lat: 62.60070051849284, lng: 29.765676378954662 }}
          mapId="map"
          gestureHandling={"greedy"}
          disableDefaultUI
        >
          <PoiMarkers pois={location} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default CustomMap;
