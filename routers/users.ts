import { DUMMY_USERS } from "../dummy-data";
import { adminProcedure, t } from "../trpc";

export const usersRouter = t.router({
  getAll: adminProcedure.query(req => {
    return DUMMY_USERS;
  })
})