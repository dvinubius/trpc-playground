import { observable } from "@trpc/server/observable";
import { DUMMY_USERS } from "../dummy-data";
import { adminProcedure, t } from "../trpc";
import {z} from 'zod';
import { EventEmitter } from "stream";

const userUpdateEventEmitter = new EventEmitter();

export const usersRouter = t.router({
  getAll: adminProcedure.query(req => {
    return DUMMY_USERS;
  }),
  updateOne: adminProcedure.input(z.object({userId: z.string(), name: z.string()})).mutation(req => {
    const userId = req.input.userId;
    const name = req.input.name;
    console.log(`Updating user ${userId} to have the name ${name}`)
    userUpdateEventEmitter.emit('update', userId);
    return {userId, name}
  }),
  onUpdate: t.procedure.subscription(() => {
    return observable<string>(emit => {
      userUpdateEventEmitter.on('update', emit.next);

      // when client connection is closed
      return () => userUpdateEventEmitter.off('update', emit.next);
    })
  })
})