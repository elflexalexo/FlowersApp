Technical Specification – MVP Mobile Application (React Native)
1. Purpose and Scope

The MVP mobile app allows users to:

Register and sign in.

Create a flower subscription through a simple multi-step flow.

View and manage their subscriptions.

Manage their profile and delivery addresses.

No one-off orders, catalogue, payments, courier mode, or loyalty features are included in MVP.

2. Technology Stack

Client: React Native + TypeScript

Navigation: React Navigation (stack)

State/Data: React Query / Zustand / Redux Toolkit (any option acceptable)

Backend: NestJS REST API

Database: Supabase (PostgreSQL)

Auth: Token-based (JWT)

3. User Role

Customer: the only role.
Registers, signs in, creates and manages subscriptions, and edits profile.

4. Functional Requirements
4.1 Registration

Fields: first name, last name, email, password.

Form validation.

On success → auto-login or redirect to login.

Error messages on invalid input or existing email.

4.2 Sign In

Fields: email, password.

Stores token securely.

Auto-login if valid token exists.

Error messages for invalid credentials.

4.3 Subscription Creation

Entry point via “Add subscription” button.

Step 1 – Select flower category/size

Predefined options (small / medium / large or similar).

User selects exactly one.

Step 2 – Select delivery frequency

Options: weekly, biweekly, monthly.

Step 3 – Delivery address

Recipient name

Recipient phone

Street

City

Postal code

Optional: notes

Option to select from saved addresses.

Step 4 – Summary & Confirmation

Shows selected category, frequency, first delivery, address.

User confirms → subscription is created.

4.4 Subscriptions List

Default screen after login.

Shows user’s subscriptions with:

Category/size

Frequency

Status

Next delivery date

Empty state when no subscriptions exist.

Visible button “Add subscription”.

4.5 Subscription Detail & Management

Detail screen shows:

Category/size

Frequency

Delivery address

Status

Next delivery date

Available actions:

Skip next delivery

Pause subscription

Resume subscription (if paused)

Cancel subscription

Extend subscription (simple fixed extension)

Edit subscription settings:

Change delivery address

Change frequency

4.6 Profile Management

Profile screen includes:

Name, surname, email, phone

Edit profile

Manage saved addresses (add, edit, delete)

Logout

This is the only personal settings area needed for MVP.

5. Navigation Structure

Auth flow:

Sign-in

Registration

Main app (after login):

Subscriptions list (home)

Subscription detail

Subscription creation wizard

Profile

Address management

Navigation can be implemented either as a stack or with a simple two-tab layout (Subscriptions / Profile).

6. Non-Functional Requirements

All API communication over HTTPS.

Tokens stored in secure storage (Keychain/Keystore).

Minimalistic UI, fast loading, no heavy graphics.

Clear user flow with back/next controls in subscription wizard.

Confirmation dialogs for destructive actions (pause, cancel, delete address).