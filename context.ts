import { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.IS_ADMIN);

export const createTrpcContext = () => {
  return {
    isAdmin: process.env.IS_ADMIN === 'true',
  }
} 