// src/routes/generalRoutes.js
import React from 'react';
import {Routes ,Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Team from '../pages/Team/Team';
import Services from '../pages/Services/Services';
import Contact from '../pages/Contact/Contact';
import About from '../pages/About/About';

const GeneralRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/team" element={<Team />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default GeneralRoutes;
