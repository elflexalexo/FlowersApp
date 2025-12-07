# FlowersApp - Complete Project Guide

## 📱 Project Overview

FlowersApp is a flower subscription management mobile app built with:
- **Frontend**: React Native (Expo) + TypeScript
- **Backend**: NestJS + Express
- **Database**: Supabase PostgreSQL
- **Authentication**: JWT Tokens

---

## 🚀 Quick StartC

### Prerequisites
- Node.js v18+ (download from nodejs.org)
- Expo Go app (on your phone)
- Supabase account (free at supabase.com)

### Step 1: Set Up Backend

```bash
cd backend

# 1. Create .env with Supabase credentials
cp .env.example .env
# Edit .env and add your Supabase credentials

# 2. Create database schema
# - Go to Supabase → SQL Editor
# - Create new query
# - Paste contents of sql/01-schema.sql
# - Run query

# 3. Start backend server
npm run start:dev
```

Expected output:
```
🚀 Application is running on: http://localhost:3000
```

### Step 2: Set Up Frontend

```bash
cd frontend

# Start development server
npm start
```

Then:
- **For Web Browser**: Press `w`
- **For Phone**: Scan QR code with Expo Go

---

## 📁 Project Structure

```
FlowersApp/
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── modules/auth/          # Authentication
│   │   ├── modules/users/         # User management
│   │   ├── modules/subscriptions/ # Subscription logic
│   │   ├── modules/addresses/     # Delivery addresses
│   │   ├── services/              # Business logic
│   │   └── app.module.ts          # App entry
│   ├── sql/
│   │   └── 01-schema.sql          # Database schema
│   ├── .env                       # Config (add credentials)
│   └── package.json
│
├── frontend/                      # React Native (Expo)
│   ├── src/
│   │   ├── screens/               # UI screens
│   │   ├── navigation/            # Navigation logic
│   │   ├── services/              # API calls
│   │   ├── store/                 # State management
│   │   ├── components/            # Reusable UI components
│   │   ├── hooks/                 # Custom React hooks
│   │   └── types/                 # TypeScript types
│   ├── .env                       # Config (optional)
│   ├── App.tsx                    # Entry point
│   └── package.json
│
├── README.md                      # Project guide (this file)
├── ARCHITECTURE.md                # System design & workflow
├── TESTING_GUIDE.md               # How to test
├── SETUP_SPRINT2.md               # Backend setup
└── TechnicalSpecification.md      # Feature requirements & scope
```

---

## 🧪 Testing the App

### Option 1: Web Browser (Recommended for Debugging)

```bash
cd frontend
npm start
# Press 'w' when prompted
```

**Benefits:**
- ✅ See console logs in DevTools (F12)
- ✅ Easy to debug UI
- ✅ Fast feedback loop
- ✅ No phone needed

**Console Logs** appear like:
```
🚀 App is preparing...
✅ App prepared successfully
🔍 Checking auth status...
📝 Registering user: test@example.com
✅ Login successful
🔑 Token stored securely
```

### Option 2: Physical Phone (with Expo Go)

```bash
cd frontend
npm start
# Scan QR code with Expo Go app
```

To see logs:
1. Shake your phone
2. Tap "View logs"
3. Or use: Ctrl+L in terminal

### Option 3: Android Emulator

```bash
cd frontend
npm start
# Press 'a' when prompted
```

---

## 🔐 Testing Authentication

### Using Web Browser Console

1. Open app: `npm start` → Press `w`
2. Open DevTools: Press `F12`
3. Go to Console tab
4. Try to register:
   - Email: test@example.com
   - Password: TestPassword123
   - First Name: John
   - Last Name: Doe
5. Watch console for logs

### Using curl (from terminal)

```bash
# Test backend directly
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

---

## 📝 API Endpoints

All endpoints are on `http://localhost:3000`

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|--------|
| POST | `/auth/register` | Create new account | ❌ |
| POST | `/auth/login` | Get JWT token | ❌ |
| GET | `/auth/profile` | Get user info | ✅ |
| POST | `/auth/validate` | Check if token valid | ❌ |
| GET | `/health` | Server status | ❌ |

---

## 🛠️ Configuration

### Backend `.env`
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_key_here
SUPABASE_SERVICE_ROLE_KEY=your_key_here
JWT_SECRET=any_random_string
PORT=3000
```

### Frontend `.env`
```
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_DEBUG_MODE=true
```

**Note**: On physical device, use your computer's IP instead:
```
EXPO_PUBLIC_API_URL=http://192.168.x.x:3000
```

Find your IP:
```bash
# Windows
ipconfig
# Look for IPv4 Address
```

---

## 🐛 Troubleshooting

### App Shows "Something Went Wrong"

**Solution:**
1. Check console logs (press F12 in browser or shake phone)
2. Look for error messages with 🔴 emoji
3. Common causes:
   - Backend not running
   - Wrong API URL
   - Supabase not set up

### "Cannot connect to server"

**Solution:**
```bash
# Check backend is running
cd backend
npm run start:dev

# Check .env has correct SUPABASE credentials
```

### "Network Error" on Registration

**Solution:**
1. Backend must be running on port 3000
2. Frontend `.env` must have correct `EXPO_PUBLIC_API_URL`
3. On physical device, use your computer's IP address

### "Invalid Credentials" on Login

**Solution:**
1. Make sure you registered first
2. Use exact same email and password
3. Check Supabase → Authentication → Users to verify

---

## 📊 Development Workflow

### 1. Start Backend
```bash
cd backend
npm run start:dev
```

### 2. Start Frontend (in another terminal)
```bash
cd frontend
npm start
# Press 'w' for web or scan QR for phone
```

### 3. Make Changes
- Edit files in `frontend/src/` or `backend/src/`
- Save file
- Changes auto-reload in browser/app

### 4. View Logs
- **Browser**: Press F12 → Console tab
- **Phone**: Shake → View logs
- **Terminal**: See output from `npm start`

### 5. Test with Backend
- Make API request from app
- Check backend terminal for logs
- Check database in Supabase dashboard

---

## 📚 Documentation Files

All documentation files are located in the project root:
- **ARCHITECTURE.md** - System design, database schema, data flows
- **TESTING_GUIDE.md** - Detailed testing instructions with logs
- **SETUP_SPRINT2.md** - Backend & Supabase setup guide
- **TechnicalSpecification.md** - Feature requirements & scope

---

## ✅ Checklist Before Deployment

- [ ] Backend running without errors
- [ ] Supabase database configured
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Token persists on app restart
- [ ] Profile endpoint returns user data
- [ ] Invalid credentials show proper error
- [ ] Frontend and backend communicate successfully

---

## 🚀 Next Steps

### Short Term
1. Set up Supabase account
2. Run backend server
3. Test authentication endpoints
4. Connect frontend to backend
5. Test full registration/login flow


### Medium Term
6. Users module (profile management)
7. Addresses module (delivery addresses)
8. Subscriptions module (create subscriptions)

### Long Term
9. End-to-end testing
10. UI polish and theme
11. Build release APK/AAB
12. Deploy to production

---

## 💡 Tips & Tricks

### See All Logs
```bash
# Add this to any component
console.log('🔵 Debug:', variable);
```

### Test Specific Endpoint
Use this curl template:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPassword123"}'
```

### Clear App Cache
```bash
# Frontend
npm start -- --clear

# Backend
rm -rf node_modules dist
npm install
npm run build
```

### Check Database
1. Go to Supabase dashboard
2. Click "SQL Editor"
3. Run: `SELECT * FROM users;`

---

## 📞 Need Help?

Check these files in order:
1. **TESTING_GUIDE.md** - Testing instructions
2. **Console logs** - Always check console first
3. **ARCHITECTURE.md** - System design overview
4. **SETUP_SPRINT2.md** - Backend setup details

---

**Happy developing! 🚀🌸**