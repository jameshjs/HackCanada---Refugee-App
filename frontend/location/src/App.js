import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapComponent from "./pages/MapComponent";
import Dashboard from "./pages/Dashboard";
import LocationDetails from "./pages/LocationDetails";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/map" element={<MapComponent />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/location/:id" element={<LocationDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
