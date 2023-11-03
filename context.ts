import { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.IS_ADMIN);

export const createTrpcContext = async ({req, res}: CreateExpressContextOptions) => {
  return {
    req,
    res,
    isAdmin: process.env.IS_ADMIN === 'true',
  }
} 