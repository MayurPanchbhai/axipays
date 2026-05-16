/** @format */

import { useState } from "react";
import "./App.css";
import CheckoutForm from "./components/CheckoutForm";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Checkout />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
