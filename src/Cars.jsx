import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('BackEnd Api');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h1>Car Inventory</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            <Link to={`/car/${car.id}`}>
              <img src={car.image_url} alt={`${car.make} ${car.model}`} />
              <p>{car.make} {car.model} - ${car.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
