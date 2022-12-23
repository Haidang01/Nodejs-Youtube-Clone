import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
mongoose.set('strictQuery', true);
const connect = mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.log(err)
});