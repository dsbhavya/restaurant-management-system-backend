const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/reservation', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const ReservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  time: String,
  members: Number,
  preference: String,
  phoneNumber: String,
  specialOccasions: String,
  allergies: String,
  specialRequest: String,
});

const Reservation = mongoose.model('Reservation', ReservationSchema);


app.post('/api/reservation', (req, res) => {
  const reservationData = req.body;

  const newReservation = new Reservation(reservationData);

  newReservation.save()
    .then(() => res.json({ message: 'Table Reserved successfully' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


