import { router, publicProcedure, protectedProcedure } from '@/server/trpc'

export const todoRouter = router({
  // Public greeting procedure (can be used without auth)
  hello: publicProcedure.query(({ ctx }) => {
    const { userId } = ctx.auth
    
    if (!userId) {
      return {
        greeting: 'Hello! You are not signed in.',
      }
    }

    return {
      greeting: `Hello ${userId}!`,
    }
  }),

  // for testing
  getTestTodos: publicProcedure.query( async () => {
    return [10, 20, 30]
  }),
 
  
})

export type TodoRouter = typeof todoRouter;
