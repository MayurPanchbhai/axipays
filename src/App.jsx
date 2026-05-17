/** @format */

import { useState } from "react";
import "./App.css";
import Checkout from "./pages/Checkout";
import HistoryDashboard from "./pages/HistoryDashboard";
import { Route, Routes } from "react-router-dom";
import TotalSummaryCard from "./pages/TotalSummaryCard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Checkout />} />
      <Route path="/history" element={<HistoryDashboard />} />
      <Route path="/dashboard" element={<TotalSummaryCard />} />
    </Routes>
  );
}

export default App;
