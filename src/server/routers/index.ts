import { router, publicProcedure, protectedProcedure } from '@/server/trpc'

import { z } from 'zod';
import { eq } from 'drizzle-orm';

import {Todos, Customers} from '@/app/db/schema';
import { db } from '@/app/db';
import { log } from 'console';


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

    addTodo: protectedProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
            const { userId } = ctx.auth;
            
            if (!userId) {
                throw new Error("User not authenticated");
            }
            
            // Find customer by clerkId
            const customer = await db.select().from(Customers)
                .where(eq(Customers.clerkId, userId))
                .limit(1)
                .then(rows => rows[0]);
            
            if (!customer) {
                throw new Error("Customer not found. Make sure you have signed up first.");
            }

            const newTodo = await db.insert(Todos).values({
                content: input,
                done: false,
                customerId: customer.id
            }).returning();

            return newTodo[0];
        }),
 
  
})

export type TodoRouter = typeof todoRouter;
