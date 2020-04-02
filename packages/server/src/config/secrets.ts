import dotenv from "dotenv";

dotenv.config();

const { SERVER_PORT: PORT } = process.env;
const SERVER_PORT = (PORT && +PORT) || 8080;
const { DB_NAME, DB_HOST, DB_PASSWORD, DB_USERNAME, NODE_ENV } = process.env;

export { SERVER_PORT, DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME, NODE_ENV };
