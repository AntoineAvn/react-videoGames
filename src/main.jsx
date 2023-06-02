import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NavBar />

    <Routes>
      <Route path="/" element={<App />} />
{/*       <Route path="/search" element={<SearchPage />} />
      <Route path="/history" element={<HistoriquePage />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
