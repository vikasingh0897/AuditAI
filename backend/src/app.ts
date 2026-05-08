import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

// Express App Object Initilization
const app = express();

// Cors configuration
app.use(
  cors({
    origin: [process.env.CORS_URL || '', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Basic Configuration
app.use(express.urlencoded({ limit: '16kb', extended: true }));
app.use(express.static('public'));
app.use(express.json({ limit: '16kb' }));
app.use(cookieParser());

// Home Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running!',
    timestamp: new Date().toISOString(),
  });
});

// Audit Routes -->
import auditRouter from './routes/audit.route.js';
app.use('/api/audit', auditRouter);

// Lead Routes -->
import leadRouter from './routes/lead.route.js';
app.use('/api/leads', leadRouter);

// Pricing Routes -->
import toolsRouter from './routes/tools.route.js';
app.use('/api/tools', toolsRouter);

export default app;
