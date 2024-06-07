/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


app.use('/api/users', require('./routes/users'));
app.use('/api/movies', require('./routes/movies'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/