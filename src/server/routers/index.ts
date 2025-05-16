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
    
    // Get todos for the current user
    getTodos: protectedProcedure.query(async ({ ctx }) => {
        const { userId } = ctx.auth;
        
        // Find customer by clerkId
        const customer = await db.select().from(Customers)
            .where(eq(Customers.clerkId, userId))
            .limit(1)
            .then(rows => rows[0]);
        
        if (!customer) {
            return [];
        }
        
        // Get todos for this customer
        const todos = await db.select().from(Todos)
            .where(eq(Todos.customerId, customer.id))
            .orderBy(Todos.id);
            
        return todos;
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
        
    // Toggle a todo's done status
    toggleTodo: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input, ctx }) => {
            const { userId } = ctx.auth;
            
            // Find customer by clerkId
            const customer = await db.select().from(Customers)
                .where(eq(Customers.clerkId, userId))
                .limit(1)
                .then(rows => rows[0]);
            
            if (!customer) {
                throw new Error("Customer not found");
            }
            
            // Get the todo
            const todo = await db.select().from(Todos)
                .where(eq(Todos.id, input.id))
                .limit(1)
                .then(rows => rows[0]);
                
            if (!todo) {
                throw new Error("Todo not found");
            }
            
            // Check if this todo belongs to the customer
            if (todo.customerId !== customer.id) {
                throw new Error("Unauthorized");
            }
            
            // Toggle the done status
            const updatedTodo = await db.update(Todos)
                .set({ done: !todo.done })
                .where(eq(Todos.id, input.id))
                .returning();
                
            return updatedTodo[0];
        }),
})

export type TodoRouter = typeof todoRouter;
