import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import "./index.css"

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [sortKey, setSortKey] = useState('price'); 
  const [sortDirection, setSortDirection] = useState('asc');
  const [attributes] = useState([
    'price', 'year', 'make', 'model', 'mileage', 'condition', 'fuel_type', 'transmission', 'color'
  ]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cars`);
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    const key = params.get('key') || 'price'; 
    const direction = params.get('direction') || 'asc';
    return { key, direction };
  };

  const fetchSortedCars = async () => {
    const { key, direction } = getQueryParams();
    try {
      const response = await axios.get(`http://localhost:3001/cars/sort`, {
        params: { key, direction },
      });
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching sorted cars:', error);
    }
  };
  useEffect(() => {
    fetchSortedCars();
  }, [location]);

  const handleSortChange = (newSortKey, newSortDirection) => {
    setSortKey(newSortKey);
    setSortDirection(newSortDirection);

    navigate(`/cars/sort?direction=${newSortDirection}&key=${newSortKey}`);
  };

  const handleDetailsClick = (id) => {
    navigate(`/car/${id}`);
  };


  return (
    <div className="container">
        <h1 className="title">Convergent Car Dealership</h1>
        <div className="sort-options">
        <div>
          <label htmlFor="sort-key">Sort by:</label>
          <select
            id="sort-key"
            value={sortKey}
            onChange={(e) => handleSortChange(e.target.value, sortDirection)}
          >
            {attributes.map((attribute) => (
              <option key={attribute} value={attribute}>
                {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort-direction">Direction:</label>
          <select
            id="sort-direction"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        </div>
      <div className="grid">
        {cars.map((car) => (
        <div key={car.id} className="card">
        <img
            src={car.image_url}
            alt={`${car.make} ${car.model}`}
            className="card-image"
        />
        <div className="card-info">
            <h2>{`${car.year} ${car.make} ${car.model}`}</h2>
            <p>Price: ${car.price.toLocaleString()}</p>
            <p>Condition: {car.condition}</p>
            <p>Mileage: {car.mileage.toLocaleString()} miles</p>
        </div>
        <button onClick={() => handleDetailsClick(car.id)} className='details-button'>More Details</button>
        </div>
        ))}
     </div>
    </div>
  );
};

export default CarList;
