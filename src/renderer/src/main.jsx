import './assets/main.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Fragment from "./page/fragment";
import Tag from "./page/tag";
import Form from './page/formulaire';
import Header from "./page/header";  
import About from './page/about';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/fragment" replace />} /> 
        <Route path="/fragment" element={<Fragment />} />
        <Route path="/tag" element={<Tag />} />
        <Route path="/about" element={<About />} />
        <Route path="/formulaire" element={<Form />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
