// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const users = [
  { email: 'user@example.com', password: 'password123' }, // Example user
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });
    return res.json({ success: true, token });
  }
  
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
