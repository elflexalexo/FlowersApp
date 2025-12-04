✅ MVP Development To-Do List (Spec-Driven)

**BACKEND SETUP (NestJS + Supabase)**

0.Backend – Project Setup

 Initialize NestJS project (NestJS CLI)

 Configure TypeScript + tsconfig

 Install core libraries:
   - @nestjs/common, @nestjs/platform-express
   - @nestjs/jwt, @nestjs/passport (JWT authentication)
   - @supabase/supabase-js (Supabase client)
   - class-validator, class-transformer (DTO validation)
   - dotenv (environment variables)

 Set up .env with Supabase credentials (URL, anon key, service role key)

 Create folder structure:
   - /src/modules (auth, subscriptions, users, addresses)
   - /src/services
   - /src/controllers
   - /src/dto
   - /src/guards
   - /src/interceptors

 Configure Supabase connection (PostgreSQL)

0.Backend – Database Schema (Supabase)

 Create tables:
   - users (id, email, password_hash, first_name, last_name, phone, created_at)
   - subscriptions (id, user_id, category, frequency, status, next_delivery, created_at)
   - addresses (id, user_id, recipient_name, recipient_phone, street, city, postal_code, notes, is_default)
   - subscription_addresses (subscription_id, address_id)

 Set up RLS (Row Level Security) policies for data isolation

 Create indexes for performance

**FRONTEND SETUP (React Native)**

0. Project Setup

 Create Git repo (main branch + dev branch)

 Initialize React Native project (Expo or RN CLI – your choice)

 Configure TypeScript

 Install core libraries:

@react-navigation/native, @react-navigation/native-stack

react-native-safe-area-context

react-native-gesture-handler

State library (React Query / Zustand / Redux Toolkit)

 Set up .env + API base URL

 Create folder structure:

/screens

/components

/navigation

/services/api

/hooks

/types

/store (if Zustand/Redux)

 Add global theme + styles (basic color palette, typography)

1. Authentication
1.1 API service

 Create authService with:

register()

login()

getMe()

1.2 Screens

 Registration screen (form validation, API call)

 Login screen

 Error + loading states

 Auto-login handling (token read on app start)

1.3 Token management

 Secure token storage (Keychain/Keystore via expo-secure-store or similar)

 Token refresh (if backend supports)

 Logged-in user context provider

2. App Navigation

 Auth stack (Sign In, Registration)

 Main stack (subscriptions, profile, etc.)

 Check-auth-on-launch: redirect accordingly

 Basic header config (titles, back buttons)

3. Subscriptions
3.1 API service

 Create subscriptionService with:

getAll()

getOne(id)

createSubscription(payload)

updateSubscription(id, payload)

skipNext(id)

pause(id)

resume(id)

cancel(id)

extend(id)

4. Subscriptions List Screen

 Implement data fetch (React Query hook)

 Show list with basic cards:

Category/size

Frequency

Next delivery date

Status

 Empty state

 “Add subscription” button

 Navigation to detail

5. Subscription Creation Wizard

Create a 3–4 step flow.

Step 1 – Category/Size

 UI for selecting small/medium/large

 Save selection to local wizard state

Step 2 – Frequency

 UI for selecting weekly/biweekly/monthly

Step 3 – Delivery Address

 Form:

Recipient name

Recipient phone

Street

City

Postal code

Notes

 Option: choose from saved addresses

 Validation

Step 4 – Summary

 Show full summary of chosen options

 “Confirm subscription” button

 Call createSubscription() and redirect to list

6. Subscription Detail & Edit

 Display detail data

 Buttons:

Skip delivery

Pause

Resume

Cancel

Extend

Edit (opens editing screen)

Edit screen

 Edit frequency

 Edit delivery address

 Save via updateSubscription()

7. Profile Management
Profile Info

 Screen showing:

First name

Last name

Email

Phone

 Edit button → form to update via API

Addresses

 List of saved addresses

 Add new address

 Edit address

 Delete address

 Hook into subscription wizard

8. Quality & UX

 Global loading indicator

 Global error toast/snackbar

 Form validation everywhere

 Basic light theme

 Disable back-button in critical steps to avoid state loss

9. API Integration

 Create base API client (axios or fetch)

 Add request interceptors for token

 Add error handling middleware

 Connect all services to backend endpoints

10. Testing & Polishing

 Test registration + login flow

 Test subscription creation end-to-end

 Test editing subscription

 Test pause/resume/cancel/extend

 Test address management

 Test logout

 Check behavior with expired token

 Clean UI + unify design

11. Build & Deliver

 Build Android debug

 Build Android release (APK/AAB)

 Export iOS build (if using Expo → EAS)

 Write README for project

---

## 🚀 SPRINT STRATEGY – Parallel Development

**Sprint 1: Foundation (Tasks 1-2 + Task 6)**
- Backend: NestJS setup + Supabase schema
- Frontend: React Native project setup
- *Result: Both projects bootstrapped, ready for integration*

**Sprint 2: Auth Integration (Task 3 + Task 7)**
- Backend: Auth module (register/login endpoints)
- Frontend: Auth screens + token storage
- *Result: Can register and login end-to-end ✅*

**Sprint 3: Navigation + Basic API (Task 8 + Task 13)**
- Backend: Users module (getProfile)
- Frontend: Navigation structure + API client
- *Result: Logged-in user persists across app restart ✅*

**Sprint 4: Subscriptions Core (Task 4-5 + Tasks 9-10)**
- Backend: Subscriptions & Addresses modules
- Frontend: Subscriptions list + creation wizard
- *Result: Full subscription creation flow works end-to-end ✅*

**Sprint 5: Management + Profile (Tasks 11-12)**
- Backend/Frontend: Complete subscription management & profile screens
- *Result: All core features functional*

**Sprint 6: Polish & Release (Tasks 14-15)**
- Testing, error handling, UI polish, build & release