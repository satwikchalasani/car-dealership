import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarList from './Cars';
import CarDetails from './CarDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="/car/:id" element={<CarDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

