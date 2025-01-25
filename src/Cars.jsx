import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./index.css"

const CarList = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

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

  const handleDetailsClick = (id) => {
    navigate(`/car/${id}`);
  };


  return (
    <div className="container">
        <h1 className="title">Convergent Car Dealership</h1>
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
