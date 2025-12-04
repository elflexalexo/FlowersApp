# 🚀 Sprint 2 Setup Guide - Backend & Database

## Overview
Sprint 2 involves:
1. Setting up Supabase database
2. Creating backend Auth module (NestJS)
3. Testing endpoints with curl

---

## Step 1: Set Up Supabase (5 minutes)

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or login
3. Click "New Project"
4. Fill in:
   - **Name**: FlowersApp
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to you
5. Click "Create new project" (waits 2-3 minutes)

### 1.2 Get Your Credentials

Once project is ready:

1. Go to **Settings** → **API**
2. Copy these and save them:
   ```
   - Project URL (SUPABASE_URL)
   - anon public key (SUPABASE_ANON_KEY)
   - service_role key (SUPABASE_SERVICE_ROLE_KEY) - Keep SECRET!
   ```

### 1.3 Create Database Schema

1. In Supabase, go to **SQL Editor**
2. Click **"New Query"**
3. Copy the entire contents of `backend/sql/01-schema.sql`
4. Paste it into the query editor
5. Click **"Run"**
6. Wait for success message ✅

**What was created:**
- ✅ `users` table
- ✅ `addresses` table  
- ✅ `subscriptions` table
- ✅ Row Level Security (RLS) policies
- ✅ Indexes for performance
- ✅ Auto-update triggers

---

## Step 2: Configure Backend

### 2.1 Update `.env` file

Open `backend/.env` and replace with your Supabase credentials:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
JWT_SECRET=your-super-secret-key-here
```

### 2.2 Verify Configuration

Check that these files exist:
- ✅ `backend/.env` (with your credentials)
- ✅ `backend/src/modules/auth/auth.controller.ts`
- ✅ `backend/src/modules/auth/auth.service.ts`
- ✅ `backend/src/modules/auth/auth.module.ts`
- ✅ `backend/src/modules/auth/guards/jwt.guard.ts`
- ✅ `backend/src/modules/auth/dto/register.dto.ts`
- ✅ `backend/src/modules/auth/dto/login.dto.ts`

---

## Step 3: Start Backend Server

### 3.1 Build & Start

```bash
cd backend

# Start development server (watches for changes)
npm run start:dev
```

### Expected Output:
```
[NestFactory] Starting Nest application...
[InstanceLoader] AuthModule dependencies initialized +15ms
[RoutesResolver] AppController {/}:
[RoutesResolver] AuthController {/auth}:
  POST /auth/register
  POST /auth/login
  GET /auth/profile
  POST /auth/validate
[NestApplication] Nest application successfully started +25ms
🚀 Application is running on: http://localhost:3000
```

If you see the routes above, ✅ **Backend is ready!**

---

## Step 4: Test API Endpoints

### 4.1 Test Health Endpoint

```bash
curl http://localhost:3000/health
```

**Expected response:**
```json
{"status":"ok","message":"FlowersApp Backend is running"}
```

### 4.2 Test Registration

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPassword123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Expected response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "testuser@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Save the `accessToken`** - you'll use it for the next tests!

### 4.3 Test Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPassword123"
  }'
```

**Expected response:** (same as registration)

### 4.4 Test Get Profile

Replace `YOUR_TOKEN` with the token from step 4.2:

```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "testuser@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": null,
  "createdAt": "2025-11-27T22:30:00.000Z"
}
```

### 4.5 Test Invalid Token

```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer invalid_token_here"
```

**Expected response:**
```json
{"message":"Invalid token","error":"Unauthorized","statusCode":401}
```

---

## Step 5: Connect Frontend to Backend

### 5.1 Update Frontend `.env`

Open `frontend/.env`:

```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
```

**On physical device/emulator, use your computer's IP instead:**
```bash
EXPO_PUBLIC_API_URL=http://192.168.x.x:3000  # Replace with your IP
```

Find your IP:
```bash
# On Windows
ipconfig
# Look for "IPv4 Address"
```

### 5.2 Start Frontend

```bash
cd frontend
npm start
```

Then scan QR code with Expo Go.

---

## 🧪 Manual Testing Checklist

- [ ] Health endpoint returns ok
- [ ] Register new user (with valid password)
- [ ] Register duplicate email (should fail with 400)
- [ ] Register with weak password (should fail with 400)
- [ ] Login with correct credentials
- [ ] Login with wrong password (should fail with 401)
- [ ] Get profile with valid token
- [ ] Get profile with invalid token (should fail with 401)
- [ ] Token works after app restart

---

## 📝 What's Next (Sprint 2 continued)

Once these tests pass, we'll implement:
- [ ] Users module (update profile)
- [ ] Addresses module (create, read, update, delete)
- [ ] Subscriptions module (full CRUD + actions)

---

## ⚠️ Troubleshooting

### "SUPABASE_URL not found"
**Fix:** Check your `.env` file exists and has the right variable names

### "Invalid credentials"
**Fix:** Copy credentials again from Supabase Settings → API

### "Email already registered"
**Fix:** Use a different email, or clear the database and recreate it

### "Token invalid"
**Fix:** Make sure you're using the exact token from registration/login response

### "Connection refused on localhost:3000"
**Fix:** Make sure backend is running with `npm run start:dev`

---

## 🎯 Success Indicators

✅ You can register a user
✅ Token is returned
✅ You can login with the same credentials
✅ Profile endpoint returns user data with valid token
✅ Invalid tokens are rejected with 401

**If all 5 work → Sprint 2 Part 1 is complete!** 🎉
