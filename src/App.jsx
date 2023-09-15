import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyHome from "./component/MyHome";
import Mynav from "./component/MyNav";
import MyResult from "./component/MyResult";
import MyReserch from "./component/MyReserch";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Mynav />
        <Routes>
          <Route path="/" element={<MyHome />} />
          <Route path="/ricerca" element={<MyReserch />} />
          <Route path="/ricerca/result/:cord" element={<MyResult />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
