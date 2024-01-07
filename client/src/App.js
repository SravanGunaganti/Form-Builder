import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import "./index.css";
import FormCreate from "./components/FormCreate";
import FormEdit from "./components/FormEdit";
import FormView from "./components/FormView";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form/create" element={<FormCreate />} />
        <Route path="/form/:id/edit" element={<FormEdit />} />
        <Route path="/form/:id" element={<FormView />} />
        <Route path="*" element={<Navigate  to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
