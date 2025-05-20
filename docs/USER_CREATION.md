# User Creation Flow

This document outlines the user creation process in this application, which uses Clerk for authentication and our own database for user data storage.

## Sign-Up Process

1. **User Initiates Sign-Up**:
   - User navigates to `/sign-up` page
   - Clerk's sign-up component provides various sign-up methods (email, social providers)
   - User completes the sign-up form with required information

2. **Clerk Account Creation**:
   - Clerk validates the provided information
   - Creates a new user account in Clerk's system
   - Issues authentication tokens and creates a session
   - Redirects user to the application dashboard

3. **Webhook Notification**:
   - Clerk sends a webhook event to `/api/clerkhooks` endpoint
   - The webhook contains details about the new user (ID, email, name)

4. **Database Synchronization**:
   - The webhook handler processes the `user.created` event
   - Creates a corresponding user record in our application database
   - Associates the Clerk user ID with our internal user representation

5. **User Activation**:
   - User is now fully registered and can use the application
   - All subsequent operations will use the Clerk user ID for authentication and authorization

## User Data Flow

```
┌─────────────────┐    ┌───────────────┐    ┌──────────────────┐
│  Clerk Sign-Up  │    │  Clerk API    │    │ Application DB   │
│  Component      │───▶│  User Created │───▶│ User Record      │
└─────────────────┘    └───────────────┘    └──────────────────┘
                              │
                              ▼
                      ┌───────────────┐
                      │ Webhook Event │
                      │ user.created  │
                      └───────────────┘
```

## Implementation Details

- **Sign-Up Page**: `src/app/sign-up/[[...sign-up]]/page.tsx` 
- **Webhook Handler**: `src/app/api/clerkhooks/route.ts`
- **Database Schema**: User data structure defined in `src/app/db/schema.ts`

## Error Handling

- If webhook delivery fails, Clerk will retry sending the webhook
- Database errors during user creation are logged and monitored
- Users are still authenticated with Clerk even if database synchronization fails temporarily

## Account Deletion

When a user account is deleted:
1. User initiates deletion through Clerk's user management
2. Clerk sends a `user.deleted` webhook event
3. Application removes user data from the database 
4. All associated user content is either deleted or anonymized according to data retention policies