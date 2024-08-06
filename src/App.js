import React from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import { createRoot } from "react-dom/client";

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
