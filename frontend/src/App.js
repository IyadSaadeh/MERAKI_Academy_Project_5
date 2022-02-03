import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navigation from "./Components/navigation/navigation";
import Login from "./Components/login/login";
import Register from "./Components/Register/Register";
import MainPage from "./Components/MainPage/MainPage";

//App Function
function App() {
  return (
    <div className="App">
      <Navigation />
      <MainPage/>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/MainPage" element={<MainPage />} />
     
      </Routes>
      <h1>Start project 5</h1>
      <Register />
    </div>
  );
}

export default App;
