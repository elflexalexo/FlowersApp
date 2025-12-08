# FlowersApp MVP Task List

## 📝 To Do

### MUST HAVE
- FR-001: Plan Selection – User selects 1–4 boxes/month, price display, summary
- FR-002: Delivery Address – Form with validation (Name, Street, Zip, City, Phone, Note)
- FR-003: Delivery Windows – Select fixed times (Wed/Fri 9–17), zone availability check
- FR-004: Payment (Sandbox) – Create Payment Intent, sandbox payment, return status
- FR-005: Confirmation & Subscription Detail – Overview of plan, address, next delivery, payment status
- FR-006: Pause/Skip – User can pause subscription or skip nearest delivery (latest 24h before)
- FR-007: Change Plan – Change box count, price recalculation, effective next cycle
- FR-008: Cancel Subscription – Immediate termination, confirmation, update delivery schedule
- FR-009: Basic Delivery Overview – List past/future deliveries, status, date/window
- FR-010: Basic Analytics – Log key events (create/pay/success/fail/skip/cancel)

### SHOULD HAVE
- FR-013: Edit Next Delivery Date – Modify date within allowed limits

### General

 Save real subscription data to Supabase (backend)
 Add error messages and loading states to all screens
## ✅ Completed
 Implement subscriptions list screen (fetch and display user subscriptions)
