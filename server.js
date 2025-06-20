import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import voterRoutes from './routes/voterRoutes.js';
import voteRoutes from './routes/voteRoutes.js';
import uploadRoute from './routes/uploadRoute.js';
import candidateRoutes from './routes/candidateRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB();
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// UPDATED CORS CONFIGURATION HERE
const allowedOrigins = [
  'http://localhost:3000',
  'https://digital-voting-frontend-jkh60nmy6.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use('/api/voters', voterRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/upload', uploadRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 7001;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
