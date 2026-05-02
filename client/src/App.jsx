import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Homepage from "./pages/homepage";
import HowItWorks from "./pages/howitworks";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="how-it-works" element={<HowItWorks />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}