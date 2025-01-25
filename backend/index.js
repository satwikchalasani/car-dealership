const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const cars = require('./cars.json');

app.get('/cars', (req, res) => {
  return res.json(cars)
});

app.get('/car/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const car = cars.find(c => c.id === carId);

    console.log(car)
    
    if (car) {
      return res.json(car);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
});

app.get('/cars/sort', (req, res) => {
    const { direction, key } = req.query;

    if (!direction || !key) {
      return res.status(400).json({ message: 'Direction and key are required' });
    }
  
    const sortedCars = cars.sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  
    return res.json(sortedCars);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});