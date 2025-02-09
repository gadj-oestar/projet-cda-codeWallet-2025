
import './assets/main.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/home";
import Fragment from "./page/fragment";
import Tag from "./page/tag";
import Form from './page/formulaire';
import Header from "./page/header";  // Importer le Header

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fragment" element={<Fragment />} />
        <Route path="/tag" element={<Tag />} />
        <Route path="/formulaire" element={<Form />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
