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
    
    if (car) {
      return res.json(car);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});