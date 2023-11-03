import express, { Application } from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { appRouter } from './routers';
import { createTrpcContext } from './context';

const app: Application = express(); 

app.use(cors({origin: "http://localhost:5173"}));
app.use('/trpc', createExpressMiddleware({ router: appRouter, createContext: createTrpcContext }))

const PORT = 3000; 
  
app.listen(PORT, () => 
    console.log("Server is Successfully Running,and App is listening on port "+ PORT)  
); 


