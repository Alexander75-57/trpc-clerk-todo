import {
    integer,
    pgTable,
    varchar,
    serial,
    boolean,
    timestamp,
    text,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm'; //Relation between two tables

export const Customers = pgTable('customers', {
    id: serial('id').primaryKey(),
    clerkId: varchar('clerk_id').unique().notNull(),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name').notNull(),
    email: varchar('email').unique().notNull(),
    active: boolean('active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
});



export const Todos = pgTable('todos', {
    id: serial('id').primaryKey(),
    content: text('content').notNull(),
    done: boolean('done').default(false).notNull(),
    customerId: integer('customer_id')
    .notNull()
    .references(() => Customers.id),
})

//Create Relations
export const CustomerRelations = relations(Customers, ({ many }) => ({
    todos: many(Todos),
}));

export const TodosRelations = relations(Todos, ({ one }) => ({
    customer: one(Customers, {
        fields: [Todos.customerId],
        references: [Customers.id],
    }),
}));
