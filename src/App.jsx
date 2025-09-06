import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Horarios from "./components/Horarios";

function App() {
  return (
    <HashRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Horarios />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
