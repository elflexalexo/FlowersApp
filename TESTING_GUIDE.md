# FlowersApp - Testing Guide

## Quick Start: Test the App Now

### Prerequisites
- Node.js (already installed ✅)
- Expo Go app on your phone OR Android Studio

---

## Method 1: Expo Go on Your Phone (5 minutes)

### Install Expo Go
- **iOS**: Download from App Store
- **Android**: Download from Google Play

### Run the app
```bash
cd frontend
npm start
```

### Connect
- **iPhone**: Open Camera app → Scan QR code → "Open in Expo Go"
- **Android**: Open Expo Go app → Tap "Scan QR code" → Scan

### What to test
1. **Login Screen** - Try logging in (will fail - no backend yet)
2. **Register Link** - Tap "Don't have an account?" 
3. **Register Screen** - Form validation works
4. **Back Navigation** - Tap "Already have an account?"
5. **UI** - Check colors, fonts, spacing

---

## Method 2: Android Emulator (10 minutes first time)

### Setup Android Emulator
```bash
# Option A: Use Android Studio UI (easiest)
# 1. Open Android Studio
# 2. Tools → Device Manager
# 3. Create Virtual Device (Pixel 6, API 31+)
# 4. Launch it

# Option B: Command line (if you want)
# $ANDROID_HOME/emulator/emulator -avd Pixel_6_API_31 &
```

### Run the app
```bash
cd frontend
npm start
# Press 'a' to open in Android emulator
```

### Advantages
- ✅ Close to real device experience
- ✅ Test on multiple screen sizes
- ✅ No physical device needed
- ✅ Can test notifications, permissions, etc.

---

## Method 3: Web Browser (Testing UI + Debugging)

**Perfect for:** Debugging errors, seeing console logs, testing UI without phone

### Run the app
```bash
cd frontend
npm start
# Press 'w' to open in web browser
```

### Browser Console Output
You'll see detailed logs:
```
🚀 App is preparing...
✅ App prepared successfully
✅ Splash screen hidden
🎯 Navigation rendering with auth state: false
🔍 Checking auth status...
⚠️ No token found, user not authenticated
📍 Navigation state changed
✅ Navigation container ready
```

### Debugging Tips
1. **Open Developer Console** - F12 or Right-click → Inspect
2. **Go to Console tab** - See all logs and errors
3. **Test Login** - Fill form and watch logs
4. **Network tab** - See API requests and responses
5. **Application tab** - Check SecureStore simulation

### Common Errors to Look For

**Network Error:**
```
❌ Login error: Network Error
```
→ Make sure backend is running on http://localhost:3000

**Invalid Credentials:**
```
❌ Login error: Invalid email or password
```
→ Check your email and password are correct

**No Token Found:**
```
⚠️ No token found in secure storage
```
→ Normal on first login, should appear after registration

---

## Current State: What Will/Won't Work

### ✅ Working
- ✅ Login & Register screens visible
- ✅ Form validation (empty fields, required)
- ✅ Navigation between screens
- ✅ UI styling & colors
- ✅ Zustand state management

### ❌ Not Working Yet (Need Backend)
- ❌ Actual login/registration (no API)
- ❌ Token storage (no Supabase)
- ❌ Subscriptions screens
- ❌ Profile functionality

---

## 🐛 Debugging Guide

### Enable Debug Logging

The app now includes comprehensive logging. You'll see messages like:

```
🚀 App is preparing...
✅ App prepared successfully
🔐 Checking authentication status...
✅ Navigation container ready
📝 Registering user: test@example.com
🔑 Token stored securely
```

### View Logs

**Method 1: Web Browser (Best for Debugging)**
```bash
npm start
# Press 'w'
# Press F12 to open console
# You'll see all logs in real-time
```

**Method 2: Expo Go App**
- Open Expo Go
- Scan QR code
- Shake phone to open menu
- Tap "Logs" (or press Ctrl+L in terminal)

**Method 3: Terminal Console**
```bash
# All logs appear in the terminal where you ran npm start
# Look for messages with 🔴 ❌ ⚠️ ✅ emoji
```

### Common Issues & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `❌ Network Error` | Backend not running | Start backend: `cd backend && npm run start:dev` |
| `Cannot GET /auth/login` | Wrong API URL | Check `frontend/.env` has correct `EXPO_PUBLIC_API_URL` |
| `Something went wrong` (blank screen) | App crash, check console | Look for logs, share error with console screenshot |
| `Invalid token` | Token expired | Register again to get new token |
| `No token found` | Normal on first load | This is expected before login |

---

## Troubleshooting

### "Cannot connect to backend"
**Expected!** Backend isn't running yet. See next section.

### "QR code not scanning"
- Make sure WiFi is connected
- Try again with better lighting
- Restart Expo Go app

### "Emulator won't start"
- Make sure you have 8GB+ RAM available
- Disable Intel Hyper-V if on Windows (some conflict)
- Try: `wsl --shutdown` then restart emulator

---

## Next: Start Backend for Full Testing

Once backend is implemented:

```bash
# Terminal 1: Backend
cd backend
npm run start:dev

# Terminal 2: Frontend
cd frontend
npm start
```

Then the login will actually work! ✨

---

## Testing Checklist (Once Backend Ready)

- [ ] Register new account
- [ ] Login with credentials
- [ ] Token persists on app restart
- [ ] View subscriptions list (empty state)
- [ ] Profile screen shows user info
- [ ] Logout clears data
- [ ] Try invalid login (error message shows)

