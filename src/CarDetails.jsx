import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/car/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);

  return (
    <div>
      <h1>{car.make} {car.model}</h1>
      <img src={car.image_url} alt={`${car.make} ${car.model}`} />
      <p>Price: ${car.price}</p>
      <p>Year: {car.year}</p>
      <p>Condition: {car.condition}</p>
      <p>Mileage: {car.mileage}</p>
      <p>Fuel Type: {car.fuel_type}</p>
      <p>Transmission: {car.transmission}</p>
      <p>Color: {car.color}</p>
      <p>Description: {car.description}</p>
      <p>VIN: {car.vin}</p>
    </div>
  );
};

export default CarDetails;
