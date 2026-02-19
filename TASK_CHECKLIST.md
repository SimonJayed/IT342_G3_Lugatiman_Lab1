# Task Checklist - Grossery Project

## DONE
### Security & Backend Foundation
- [x] **Backend Validation & Security** (Commit: `init-backend-sec`)
    - Implemented strict regex for email/password.
    - Input sanitization logic.
    - BCrypt password encoding.
    - JWT filter and authentication logic.
- [x] **Database & User Entity** (Commit: `fix-schema-v2`)
    - User entity with Name, Username, Email.
    - Migration to `grossery_v2` database.
- [x] **API Endpoints** (Commit: `auth-endpoints`)
    - `/api/auth/register` implementation.
    - `/api/auth/login` implementation.
    - `/api/user/me` implementation.

### Frontend Implementation
- [x] **Authentication Pages** (Commit: `fe-auth-pages`)
    - Login Page with error handling.
    - Register Page with validation.
    - AuthContext for state management.
- [x] **Core UI Structure** (Commit: `ui-scaffold`)
    - Dashboard Layout (Sidebar, Header).
    - Profile Page with User Details.
    - Protected Route wrappers.
- [x] **UI Polish & UX** (Commit: `ui-polish-v1`)
    - Global "Grossery" Design System (Colors, Fonts).
    - Google Fonts integration (DM Sans, Playfair).
    - Toast Notification System (Success/Error feedback).
    - Confirmation Modal for Logout.
    - Input field styling.

## IN-PROGRESS
### Dashboard Integration
- [ ] Connecting Dashboard stats to backend aggregation endpoints.

## TODO
### Grocery Item Management
- [ ] CRUD Endpoints for `GroceryItem`.
- [ ] Frontend List View & Add Item Modal.
- [ ] Edit/Delete functionality.

### Monthly Consumption Tracking
- [ ] `ConsumptionLog` Entity & API.
- [ ] Log Input Interface (Table View).
- [ ] Variance Calculation Logic.

### Expiry Date Tracking
- [ ] `StockBatch` Entity & API.
- [ ] Expiry Status Logic (Fresh/Expiring/Expired).
- [ ] Frontend Expiry Tracker & Alerts.

### Documentation (Final)
- [ ] Finalize FRS PDF with all screenshots.
- [ ] Mobile App Screenshots (Lab 2).
