import { config } from 'dotenv';

config({
  path: ".env"
});

export const { 
  PORT, 
  JSON_SERVER_URL 
} = process.env;