import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';
import termsRouter from './routes/terms.js';
import pricelistRouter from './routes/pricelist.js';

dotenv.config();

const app = express();


app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

app.use('/api/terms', termsRouter);
app.use('/api/pricelist', pricelistRouter);


app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/health/db', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: 'OK', db: 'connected' });
  } catch (err) {
    res.status(503).json({ status: 'DEGRADED', db: 'unavailable', error: err.message });
  }
});

const start = async () => {
  const port = process.env.PORT || 8001;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connection established successfully.');
      await sequelize.sync();
      console.log('Database synchronized successfully.');
    } catch (err) {
      console.error('Database initialization failed:', err.message);
    }
  })();
};

start();
