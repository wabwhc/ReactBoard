import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Component/App";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Sign from "./Component/Sign"
import Profile from "./Component/Profile"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path = "/sign" element={<Sign/>} />
      <Route path = "/profile/:id" element={<Profile/>} />
      <Route path = "/*" element={<App/>} />
    </Routes>
  </BrowserRouter>
);