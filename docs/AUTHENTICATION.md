# Authentication Overview

This application uses [Clerk](https://clerk.com/) for authentication and user management. Clerk provides a complete authentication solution that handles user sign-up, sign-in, and session management.

## How Authentication Works

1. **User Authentication Flow**:
   - Users can sign up or sign in through dedicated pages (`/sign-up` and `/sign-in`)
   - Clerk handles the entire authentication process, including social logins and email verification
   - After successful authentication, users are redirected to the dashboard

2. **Protected Routes**:
   - Middleware checks for authenticated sessions on protected routes
   - Unauthenticated users are redirected to the sign-in page
   - The dashboard and other protected content is only accessible to authenticated users

3. **Server-Side Authentication**:
   - tRPC procedures use the Clerk user ID from the context
   - Database operations are tied to the authenticated user's ID
   - API routes can verify authentication status through the middleware

4. **Webhook Integration**:
   - Clerk webhooks (`/api/clerkhooks`) synchronize user data with our database
   - Events like user creation and deletion trigger appropriate database operations

## Implementation Details

- **Middleware**: `src/middleware.ts` handles route protection and authentication checks
- **User Context**: `src/server/context.ts` provides the authenticated user ID to tRPC procedures
- **Auth Pages**: Sign-in and sign-up pages use Clerk's components for rendering auth forms
- **API Integration**: `src/server/trpc.ts` defines protected procedures that require authentication

## Security Considerations

- Authentication state is managed by Clerk's secure session management
- API requests are protected through the tRPC context validation
- Database operations validate the requesting user's identity before processing
- Frontend routes are protected by the Next.js middleware