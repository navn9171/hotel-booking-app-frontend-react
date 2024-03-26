import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HotelsListing from "./components/HotelsListing";
import Navbar from "./layout/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Bookings from "./components/Bookings";
import BookHotel from "./components/BookHotel";
import EditBooking from "./components/EditBooking";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HotelsListing />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/bookHotel/:id" element={<BookHotel />} />
        <Route path="/editBooking/:id" element={<EditBooking />} />
      </Routes>
    </Router>
  );
}

export default App;
