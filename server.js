/*require('dotenv').config();
const express = require('express');
const mongoose = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User')

const app = express();
const PORT = process.env.PORT ||3000;
const secretKey = process.env.JWT_SECRET; 

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});


app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send({ message: 'User registered successfully' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
    res.status(200).send({ token });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

app.use('/api/users', require('./routes/users'));
app.use('/api/movies', require('./routes/movies'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
*/
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;
const secretKey = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});

// User Registration
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error registering user', error });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
      res.status(200).send({ token });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error });
  }
});

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/movies', require('./routes/movies'));

app.use((req, res) => {
    res.status(404).send('Not Found');
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
