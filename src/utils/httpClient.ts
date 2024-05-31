import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const clientInstance = axios.create({
  baseURL: process.env.ML_BASE_URL,
});

export default clientInstance;
