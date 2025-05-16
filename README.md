# tRPC Clerk Todo Application

A modern Todo list application built with Next.js, tRPC, Clerk authentication, and PostgreSQL via Neon.

## Features

- User authentication with Clerk
- PostgreSQL database with Drizzle ORM
- Type-safe API with tRPC
- Modern UI with Tailwind CSS
- Todo management with customer records

## Getting Started

First, set up your environment variables:

```bash
# Clerk authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Database (Neon PostgreSQL)
DATABASE_URL=your_neon_database_url
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/server` - tRPC server and routers
- `/src/app/db` - Database schemas and migrations
- `/src/app/api` - API routes including webhooks
- `/docs` - Documentation

## Authentication Flow

This application implements a custom user sign-up flow that:

1. Uses Clerk for authentication
2. Creates corresponding customer records in the database
3. Implements an onboarding process for new users

For detailed documentation on the authentication flow, see:
- [Authentication Overview](./docs/AUTHENTICATION.md)
- [User Creation Flow](./docs/USER_CREATION.md)

## Database Schema

The application uses PostgreSQL with Drizzle ORM. Main tables:

- `customers` - Customer records linked to Clerk users
- `todos` - Todo items belonging to customers
- `user_messages` - User messages

## API Endpoints

The application uses tRPC for type-safe API endpoints:

- `getTodos` - Get todos for a customer
- `createTodo` - Create a new todo
- `updateTodo` - Update an existing todo
- `deleteTodo` - Delete a todo
- `createCustomer` - Create a new customer record
- `getCustomerByEmail` - Get customer by email

## Webhooks

The application implements Clerk webhooks for:

- User creation
- User updates

## Development

To develop locally:

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`
4. Run the development server: `npm run dev`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Clerk Documentation](https://clerk.dev/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Neon PostgreSQL Documentation](https://neon.tech/docs)

## License

[MIT](LICENSE)