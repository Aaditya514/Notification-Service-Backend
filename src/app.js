import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import notificationRoutes from './routes/notificationRoutes.js'; // this path must be correct

dotenv.config();

const app = express();
app.use(express.json()); // Needed to parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Route setup — this is CRITICAL
app.use('/api', notificationRoutes);

// Optional: Root route
app.get('/', (req, res) => {
  res.send('Notification Service is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
