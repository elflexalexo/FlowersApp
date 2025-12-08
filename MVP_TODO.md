# FlowersApp MVP Task List

## 📝 To Do
### MUST HAVE
FR-001: Plan Selection – User selects 1–4 boxes/month, price display, summary
FR-002: Delivery Address – Form with validation (Name, Street, Zip, City, Phone, Note)
FR-004: Payment (Sandbox) – Create Payment Intent, sandbox payment, return status (basic solution only)
FR-005: Confirmation & Subscription Detail – Overview of plan, address, next delivery, payment status
FR-006: Pause/Skip – User can pause subscription or skip nearest delivery (latest 24h before). Next date must be stored and updated in database.
FR-007: Change Plan – Change box count, price recalculation, effective next cycle
FR-008: Cancel Subscription – Immediate termination, confirmation, update delivery schedule. Also add database logic.
FR-009: Basic Delivery Overview – List past/future deliveries, status, date/window. Add as a screen under subscription list.
FR-010: Basic Analytics – Log key events (create/pay/success/fail/skip/cancel) (basic solution only)

### General
Save real subscription data to Supabase (backend)
Add error messages and loading states to all screens (polish all screens)

Note: FR-003 (zone availability check) and FR-013 (edit next delivery date) are removed. Editing next delivery date is handled via subscription editing and must be kept consistent with database and logic.
## ✅ Completed
 Implement subscriptions list screen (fetch and display user subscriptions)
