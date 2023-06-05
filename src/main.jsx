import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Home from "./components/Home/Home.jsx";
import Footer from './components/Footer/footer';
import GameDetail from './components/GameDetail/GameDetail';
import Profil from './components/Profil/Profil';
import Search from './components/Search/Search';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NavBar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:id" element={<GameDetail />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

    <Footer />
  </BrowserRouter>
);
