const express = require('express');
const cors = require('cors');
require('dotenv').config();

const leadsRouter = require('./routes/leads');

const app = express();

// CORS — allows the React frontend (port 5173) to talk to this backend (port 5000)
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', project: 'brandsparkx-crm', port: 5000 });
});

// Routes
app.use('/api/leads', leadsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Network access: http://<your-ip>:${PORT} (for phone testing)`);
});
