require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');

const port = process.env.PORT || 8000;
const app = express();

const users = require('./routes/api/users')
const { places, profiles } = require('./routes');

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Passport Middleware
app.use(passport.initialize());
require('./config/passport')(passport);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Smile, you are being watch by the Backend Team' });
});

app.use('/api/users', users);
app.use('/places', places);
app.use('/profiles', profiles);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});