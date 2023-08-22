const express = require('express');
const app = express();

app.get('/api/trains/next12hours', (req, res) => {

  const trains = [
    {
      trainNumber: 'TR123',
      departureTime: new Date().getTime() + 1*60*60*1000, 
      arrivalTime: new Date().getTime() + 3*60*60*1000,
      seatsAvailable: 50
    },
    {
      trainNumber: 'TR234',
      departureTime: new Date().getTime() + 2*60*60*1000,
      arrivalTime: new Date().getTime() + 4*60*60*1000,  
      seatsAvailable: 30
    },
    {
      trainNumber: 'TR345',
      departureTime: new Date().getTime() + 6*60*60*1000,
      arrivalTime: new Date().getTime() + 8*60*60*1000,
      seatsAvailable: 10
    }
  ];

  const now = new Date().getTime();
  const twelveHoursLater = now + 12*60*60*1000;

  const next12HourTrains = trains.filter(train => 
    train.departureTime >= now && train.departureTime <= twelveHoursLater
  );

  res.json(next12HourTrains);

});

app.listen(3000, () => {
  console.log('Trains API listening on port 3000!');
});