import express, { Application } from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { applyWSSHandler } from '@trpc/server/adapters/ws';

import { appRouter } from './routers';
import { createTrpcContext } from './context';
import * as ws from 'ws';

const app: Application = express(); 

app.use(cors({origin: "http://localhost:5173"}));
app.use('/trpc', createExpressMiddleware({ router: appRouter, createContext: createTrpcContext }))

const PORT = 3000; 

const server = app.listen(PORT,  () => console.log("Server is Successfully Running,and App is listening on port "+ PORT)  );

applyWSSHandler({
  wss: new ws.Server({ server }),
  router: appRouter,
  createContext: createTrpcContext
});
 


