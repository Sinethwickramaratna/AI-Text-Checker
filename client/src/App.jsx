import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Homepage from "./pages/homepage";
import HowItWorks from "./pages/howitworks";
import Contact from "./pages/contact";
import About from "./pages/about";
import PrivacyTerms from "./pages/privacyterms";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-terms" element={<PrivacyTerms />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}