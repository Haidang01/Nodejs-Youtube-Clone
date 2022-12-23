import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
import './src/config/connectDB.js'
import authRoutes from './src/routes/auth.js'
import userRoutes from './src/routes/users.js'
import videoRoutes from './src/routes/videos.js'
import commentRoutes from './src/routes/comments.js'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';


// middleware
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message });
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
})