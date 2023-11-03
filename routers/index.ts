import { adminProcedure, t } from "../trpc";
import { usersRouter } from "./users";

export const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "Hi"
  }),
  logToServer: t.procedure.input(v => {
    if (typeof v === 'string') return v;
    throw new Error('Expected a string');
  }).mutation((req) => {
    console.log('CLIENT SAYS', req.input)
    return true;
  }),
  identifyAdmin: adminProcedure.query(req => {
    return req.ctx.admin;
  }),
  users: usersRouter
})