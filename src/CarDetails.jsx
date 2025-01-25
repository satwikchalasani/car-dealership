import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/car/${id}`); 
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [id]);


  return (
    <div className="car-details-container">
      <div className="car-image">
        <img 
          src={car.image_url} 
          alt={`${car.make} ${car.model}`} 
        />
      </div>
      <div className="car-info">
        <h1>{car.make} {car.model}</h1>
        <table className="car-details-table">
          <tbody>
            <tr>
              <th>Price:</th>
              <td>${car.price.toLocaleString()}</td>
            </tr>
            <tr>
              <th>Year:</th>
              <td>{car.year}</td>
            </tr>
            <tr>
              <th>Mileage:</th>
              <td>{car.mileage.toLocaleString()} miles</td>
            </tr>
            <tr>
              <th>Condition:</th>
              <td>{car.condition}</td>
            </tr>
            <tr>
              <th>Fuel Type:</th>
              <td>{car.fuel_type}</td>
            </tr>
            <tr>
              <th>Transmission:</th>
              <td>{car.transmission}</td>
            </tr>
            <tr>
              <th>Color:</th>
              <td>{car.color}</td>
            </tr>
            <tr>
              <th>Description:</th>
              <td>{car.description}</td>
            </tr>
            <tr>
              <th>VIN:</th>
              <td>{car.vin}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarDetails;
