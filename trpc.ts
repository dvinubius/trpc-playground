import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import { appRouter } from './routers';
import { createTrpcContext } from './context';
import { ADMIN_USER } from './dummy-data';

type ContextType = inferAsyncReturnType<typeof createTrpcContext>;
export const t = initTRPC.context<ContextType>().create();

export const isAdminMiddleware = t.middleware(({ ctx, next }) =>{
    if (!ctx.isAdmin) {
      throw new TRPCError({code: 'UNAUTHORIZED'});
    }
    return next({ ctx: { ...ctx, admin: ADMIN_USER }});
  },
);
export const adminProcedure = t.procedure.use(isAdminMiddleware);

export type AppRouter = typeof appRouter;