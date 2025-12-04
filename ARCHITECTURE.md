# FlowersApp - Architecture & Workflow Guide

## 📱 App Overview

**FlowersApp** is a mobile-first flower subscription service platform. Users can register, create recurring flower deliveries, and manage their subscriptions with full control over frequency, delivery addresses, and delivery status.

---

## 🏗️ System Architecture

### High-Level Components

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React Native)                  │
│                      Expo + TypeScript                      │
│  (Mobile App - iOS/Android)                                │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP REST API
                       │ JWT Token Auth
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND (NestJS REST API)                  │
│                    Express Server                           │
│  Port 3000                                                  │
│  - Authentication Module                                   │
│  - Subscriptions Module                                    │
│  - Users Module                                            │
│  - Addresses Module                                        │
└──────────────────────┬──────────────────────────────────────┘
                       │ SQL Queries
                       │ Row Level Security
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 DATABASE (Supabase PostgreSQL)              │
│                                                              │
│  Tables:                                                    │
│  - users                                                    │
│  - subscriptions                                            │
│  - addresses                                                │
│  - subscription_addresses                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 Frontend Project Structure

```
frontend/
├── App.tsx                          # Entry point with QueryClient provider
├── app.json                         # Expo configuration
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
│
├── src/
│   ├── navigation/
│   │   └── Navigation.tsx           # React Navigation setup
│   │                                # - Auth stack (Login, Register)
│   │                                # - App stack (Subscriptions, Profile, etc)
│   │                                # - Auto-login on startup
│   │
│   ├── screens/
│   │   ├── LoginScreen.tsx          # Login form + validation
│   │   ├── RegisterScreen.tsx       # Registration form + validation
│   │   ├── SubscriptionsListScreen.tsx   # List of user's subscriptions
│   │   └── ProfileScreen.tsx        # User profile + logout
│   │
│   ├── services/
│   │   ├── api.ts                   # Axios client + interceptors
│   │   │                             # - Auto-inject JWT token
│   │   │                             # - Handle 401 errors
│   │   │
│   │   └── authService.ts           # Auth API calls
│   │                                 # - register()
│   │                                 # - login()
│   │                                 # - logout()
│   │                                 # - checkAuthStatus()
│   │
│   ├── store/
│   │   └── authStore.ts             # Zustand state management
│   │                                 # - user data
│   │                                 # - token
│   │                                 # - auth status
│   │
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces
│   │                                 # - User, Subscription, Address
│   │                                 # - Navigation param types
│   │
│   ├── hooks/                        # Custom React hooks (TODO)
│   ├── components/                   # Reusable UI components (TODO)
│   └── utils/                        # Helper functions (TODO)
```

### Key Frontend Technologies
- **React Native 0.73** - Mobile framework
- **Expo** - Build/run without native setup
- **React Navigation** - Screen switching + auth flow
- **Zustand** - Lightweight state management
- **React Query** - Data fetching & caching
- **Axios** - HTTP client with interceptors
- **expo-secure-store** - Secure token storage
- **TypeScript** - Type safety

---

## 🖥️ Backend Project Structure

```
backend/
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── .env.example                     # Environment variables template
│
├── src/
│   ├── main.ts                      # App bootstrap
│   │                                 # - Enable validation pipes
│   │                                 # - Configure CORS
│   │
│   ├── app.module.ts                # Root module
│   │                                 # - Load ConfigModule (env vars)
│   │
│   ├── modules/
│   │   ├── auth/                    # Authentication (TODO)
│   │   │   ├── auth.controller.ts   # POST /auth/register, /auth/login
│   │   │   ├── auth.service.ts      # JWT + password hashing logic
│   │   │   ├── auth.module.ts       # Module config
│   │   │   ├── dto/
│   │   │   │   ├── register.dto.ts
│   │   │   │   └── login.dto.ts
│   │   │   └── guards/
│   │   │       └── jwt.guard.ts     # Protect routes with JWT
│   │   │
│   │   ├── users/                   # User management (TODO)
│   │   │   ├── users.controller.ts  # GET /users/profile, PATCH /users/profile
│   │   │   ├── users.service.ts     # User queries
│   │   │   └── users.module.ts
│   │   │
│   │   ├── subscriptions/           # Subscriptions (TODO)
│   │   │   ├── subscriptions.controller.ts
│   │   │   ├── subscriptions.service.ts
│   │   │   ├── subscriptions.module.ts
│   │   │   └── dto/
│   │   │       ├── create-subscription.dto.ts
│   │   │       └── update-subscription.dto.ts
│   │   │
│   │   └── addresses/               # Delivery addresses (TODO)
│   │       ├── addresses.controller.ts
│   │       ├── addresses.service.ts
│   │       └── addresses.module.ts
│   │
│   ├── services/
│   │   └── supabase.service.ts      # Supabase client wrapper
│   │                                 # - getClient() - admin access
│   │                                 # - getClientWithAuth() - RLS enforcement
│   │
│   ├── dto/                         # Data transfer objects (TODO)
│   ├── guards/                      # Route protection (TODO)
│   └── interceptors/                # Response formatting (TODO)
```

### Key Backend Technologies
- **NestJS 10** - Robust TypeScript framework
- **Express** - Underlying HTTP server
- **@nestjs/jwt** - JWT token generation
- **@nestjs/passport** - Authentication strategy
- **bcrypt** - Password hashing
- **Supabase JS SDK** - Database client
- **class-validator** - DTO validation
- **TypeScript** - Type safety

---

## 🗄️ Database Schema (Supabase PostgreSQL)

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Subscriptions Table
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL, -- 'small', 'medium', 'large'
  frequency VARCHAR(50) NOT NULL, -- 'weekly', 'biweekly', 'monthly'
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'paused', 'cancelled'
  next_delivery DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Addresses Table
```sql
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_name VARCHAR(100) NOT NULL,
  recipient_phone VARCHAR(20) NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  notes TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Subscription Addresses Junction Table
```sql
CREATE TABLE subscription_addresses (
  subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  address_id UUID NOT NULL REFERENCES addresses(id) ON DELETE CASCADE,
  PRIMARY KEY (subscription_id, address_id)
);
```

### Row Level Security (RLS)
- Users can only see their own data
- Authenticated users have read/write access to their data
- Prevents unauthorized cross-user data access

---

## 🔄 User Flow - Complete Workflow

### 1️⃣ Registration Flow
```
User Opens App
    ↓
[Navigation checks stored token]
    ├─ Has valid token → Go to Home (SubscriptionsList)
    └─ No token → Show Login Screen
         ↓
User taps "Don't have account?" → Register Screen
    ↓
User enters: First Name, Last Name, Email, Password
    ↓
Form Validation
    ├─ Invalid → Show error (required fields, email format)
    └─ Valid → Send to Backend
         ↓
Backend: POST /auth/register
    ├─ Email already exists → 409 Conflict
    ├─ Password weak → 400 Bad Request
    └─ Success → Hash password, create user, generate JWT token
         ↓
Frontend receives token + user data
    ↓
Store token securely (expo-secure-store)
    ↓
Update Zustand auth store (setUser, setToken, setAuthenticated)
    ↓
Navigation auto-switches to Home/SubscriptionsList Screen
```

### 2️⃣ Login Flow
```
User on Login Screen
    ↓
User enters: Email, Password
    ↓
Form Validation → Send to Backend
    ↓
Backend: POST /auth/login
    ├─ User not found → 401 Unauthorized
    ├─ Password incorrect → 401 Unauthorized
    └─ Success → Generate JWT token, return user data
         ↓
Frontend receives token
    ↓
Store token securely + update auth store
    ↓
Navigation switches to Home
```

### 3️⃣ Auto-Login Flow (on app restart)
```
App Starts
    ↓
Navigation component useEffect()
    ↓
Call authService.checkAuthStatus()
    ├─ No token in storage → Show Login Screen
    └─ Token exists → Verify with backend
         ↓
Backend: GET /auth/profile (with JWT in Authorization header)
    ├─ Token expired/invalid → 401 → Clear token
    └─ Token valid → Return user profile
         ↓
Frontend updates auth store with user data
    ↓
Navigation switches to Home Screen
    ↓
User sees SubscriptionsList (logged in)
```

### 4️⃣ API Request Flow (with JWT)
```
Frontend: axios.post('/subscriptions', payload)
    ↓
Request Interceptor
    ├─ Read token from secure storage
    └─ Add header: Authorization: Bearer <token>
         ↓
Backend receives request + JWT
    ↓
JwtGuard validates token
    ├─ Invalid/Expired → 401 Unauthorized
    └─ Valid → Extract user_id from token
         ↓
Controller processes request (user_id available)
    ↓
Service queries database with user_id
    ↓
Response interceptor formats response
    ↓
Frontend receives data
    ├─ Success → Update React Query cache
    └─ 401 → Response interceptor triggers logout
```

### 5️⃣ Create Subscription Workflow (Multi-step)
```
User: Home Screen → Taps "Add Subscription"
    ↓
[Step 1] Category Selection
    User picks: Small / Medium / Large (flowers size)
    → Save to local state
         ↓
[Step 2] Frequency Selection
    User picks: Weekly / Biweekly / Monthly
    → Save to local state
         ↓
[Step 3] Delivery Address
    ├─ Select saved address OR
    └─ Create new address
       ├─ Recipient name
       ├─ Recipient phone
       ├─ Street, City, Postal Code
       └─ Save to backend
         ↓
[Step 4] Summary & Confirm
    Show all selections
    User taps: "Create Subscription"
         ↓
POST /subscriptions
    {
      category: "medium",
      frequency: "weekly",
      addressId: "addr-123"
    }
         ↓
Backend creates subscription in DB
    ↓
Response with subscription data + next_delivery date
    ↓
Frontend navigates to SubscriptionsList (refreshed)
    ↓
New subscription appears in list
```

### 6️⃣ Subscription Management
```
User on SubscriptionsList
    ↓
[View] Subscription Card shows:
    - Category & size
    - Frequency
    - Next delivery date
    - Status (active/paused/cancelled)
         ↓
User taps card → Subscription Detail Screen
    ↓
[Actions Available]
    - Skip Next: POST /subscriptions/:id/skip
    - Pause: POST /subscriptions/:id/pause
    - Resume: POST /subscriptions/:id/resume
    - Cancel: DELETE /subscriptions/:id
    - Extend: POST /subscriptions/:id/extend
    - Edit: PATCH /subscriptions/:id
         ↓
Backend updates subscription status/dates in DB
    ↓
Frontend refetches list (React Query)
    ↓
UI updates to show new state
```

### 7️⃣ Logout Flow
```
User: Profile Screen → Taps "Logout"
    ↓
authService.logout()
    ├─ Delete token from secure store
    ├─ Clear Zustand auth store
    └─ Clear React Query cache
         ↓
Navigation subscribes to auth state
    ├─ isAuthenticated = false
    └─ Switches to Login Screen
         ↓
User sees Login/Register screens
```

---

## 🔐 Security Architecture

### Authentication (JWT)
```
Registration/Login
    ↓
Backend creates JWT token (expires in 1 hour)
    ↓
Token contains: user_id, email (no passwords)
    ↓
Frontend stores in secure storage (expo-secure-store)
    ├─ iOS: Keychain
    └─ Android: Keystore
         ↓
Every API request includes: Authorization: Bearer <token>
```

### Database Security (RLS)
```
Row Level Security Policies
    ↓
users → Can only read own row
subscriptions → Can only see own subscriptions (user_id = current_user)
addresses → Can only see own addresses (user_id = current_user)
         ↓
Even if token is compromised, SQL queries filtered by user_id
```

### Password Security
```
Registration
    ↓
Password sent over HTTPS (TLS encrypted)
    ↓
Backend hashes with bcrypt (salt + rounds)
    ↓
Never stores plaintext password
    ↓
Login compares hash (not plaintext)
```

---

## 📊 Data Flow Diagram

### Request/Response Cycle
```
┌─────────────────────────────┐
│  React Native Frontend      │
│  (User interacts)           │
└──────────────┬──────────────┘
               │
               ▼
        ┌──────────────┐
        │ Zustand      │
        │ State Store  │
        └──────────────┘
               │
               ▼
        ┌──────────────┐
        │  API Client  │
        │  (Axios)     │
        └──────────────┘
               │
        [Add JWT Token]
        [Interceptors]
               │
               ▼
         HTTP Request
        ─────────────►
               │
               ▼
    ┌─────────────────────────┐
    │  NestJS Backend         │
    │  (Process request)      │
    └──────────────┬──────────┘
                   │
             ┌─────▼────────┐
             │  Validate    │
             │  JWT Guard   │
             └─────┬────────┘
                   │
             ┌─────▼────────┐
             │  Controller  │
             │  (Route)     │
             └─────┬────────┘
                   │
             ┌─────▼────────┐
             │  Service     │
             │  (Logic)     │
             └─────┬────────┘
                   │
             ┌─────▼────────────┐
             │  Supabase Client │
             │  (SQL + RLS)     │
             └─────┬────────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │  PostgreSQL DB      │
        │  (Persist data)     │
        └────────────────────┘
               │
             ◄─ SQL result ─┘
               │
               ▼
          HTTP Response
        ◄─────────────────
               │
               ▼
    ┌──────────────────────┐
    │  Frontend            │
    │  Response Interceptor│
    │  (Check status)      │
    └──────────────────────┘
               │
         ┌─────┴──────────┬──────────┐
         │                │          │
    [200 OK]         [401 Unauth]  [500 Error]
         │                │          │
         ▼                ▼          ▼
    Update React      Logout &    Show Toast
    Query Cache       Redirect     Error
         │                │          │
         └────┬───────────┴──────┬───┘
              │                  │
              ▼                  ▼
    ┌────────────────────────────────────┐
    │  Update UI with new data           │
    │  or error state                    │
    └────────────────────────────────────┘
```

---

## 🚀 Deployment Architecture (Future)

```
GitHub (Source Code)
    ↓ CI/CD (GitHub Actions)
    ├─ Run tests
    ├─ Build
    └─ Deploy
        ├─ Backend → AWS/Heroku/Railway
        ├─ Frontend → EAS Build (Expo)
        └─ Database → Supabase Cloud
```

---

## 📋 Key Integration Points

| Component | Integrates With | Purpose |
|-----------|-----------------|---------|
| Frontend | Backend API | Send/receive data |
| Backend | Supabase | Store user data |
| Frontend | React Query | Cache API responses |
| Frontend | Zustand | Persist auth state |
| Backend | JWT | Secure authentication |
| Frontend | SecureStore | Store tokens safely |
| Backend | RLS | Enforce data privacy |

---

## ⚡ Performance Considerations

- **React Query caching** - Reduces duplicate API calls
- **JWT tokens** - Stateless authentication, scales easily
- **RLS policies** - Database enforces security, no extra app logic
- **Secure token storage** - No plaintext tokens in local storage
- **Axios interceptors** - Auto-handle token refresh/expiry

---

## 🔄 State Management Flow

```
User Action
    ↓
Component State Update
    ↓
Zustand Store Update
    ↓
API Call (Axios)
    ↓
Backend Processing
    ↓
Response
    ↓
React Query Cache Update
    ↓
Component Re-render with new data
    ↓
UI displays updated state
```

---

## 📝 Summary

**FlowersApp** is a three-tier architecture:

1. **Frontend** (React Native Expo) - User interface, state management, API communication
2. **Backend** (NestJS REST API) - Business logic, authentication, data validation
3. **Database** (Supabase PostgreSQL) - Persistent data storage with RLS security

The app follows **JWT-based authentication** with **secure token storage**, **React Query caching**, and **Row Level Security** for multi-user data isolation.

User flows are intuitive: Register → Login → Create Subscription → Manage → Logout.

All communication is encrypted (HTTPS), tokens are stored securely, and database access is restricted per user.

