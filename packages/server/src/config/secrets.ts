import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = Number(process.env.SERVER_PORT) || 8000;
const NODE_ENV = process.env.NODE_ENV;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const ACCESS_TOKEN_KEY = String(process.env.ACCESS_TOKEN_KEY);
const REFRESH_TOKEN_KEY = String(process.env.REFRESH_TOKEN_KEY);
const EMAIL_TOKEN_KEY = String(process.env.EMAIL_TOKEN_KEY);
const CORS = process.env.CORS?.split(",") || [];
const REDIS_HOST = process.env.REDIS_HOST;
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

export {
  SERVER_PORT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
  NODE_ENV,
  CORS,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  EMAIL_TOKEN_KEY,
  REDIS_HOST,
  EMAIL_USERNAME,
  EMAIL_PASSWORD
};
