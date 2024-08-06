import React from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import CustomMap from "./components/CustomMap";
import { APIProvider } from "@vis.gl/react-google-maps";

import { createRoot } from "react-dom/client";

function App() {
  return (
    <div className="App">
      <Header />
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <CustomMap />
      </APIProvider>
      <Main />
      <Footer />
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
