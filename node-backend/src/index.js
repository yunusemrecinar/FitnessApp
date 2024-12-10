const config = require('../config');
const express = require('express');
const redis = require('redis');
const authRoutes = require('./routes/authRoutes.js');

const app = express();
const port = 3000;

// Redis Client
const redisClient = redis.createClient({
    socket: {
      host: config.redis.host,
      port: config.redis.port,
    },
    password: config.redis.password,
});

redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (err) => console.error('Redis connection error:', err));

redisClient.connect().catch(console.error);

app.locals.redis = redisClient;

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        const formattedDate = new Date().toLocaleString('en-US', {
            weekday: 'short', // Short name for the day (e.g., Sun)
            year: 'numeric',
            month: 'short', // Short name for the month (e.g., Dec)
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true, // Use 12-hour format
        });

        console.log(`${formattedDate} ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });

    next();
});


// Routes
app.use('/api', authRoutes);

// Start server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
