# Digital Heroes - Lead Management System

A full-stack Lead Management System built with **Next.js**, **Express.js**, and **Supabase**. The application allows visitors to submit contact forms, enables administrators to authenticate securely, and provides an admin dashboard to manage lead statuses.

---

# Tech Stack

## Frontend
- Next.js (App Router)
- React
- Tailwind CSS

## Backend
- Node.js
- Express.js

## Database & Authentication
- Supabase PostgreSQL
- Supabase Authentication

---

# Features

- Contact form submission
- Store leads in Supabase
- Admin authentication
- Secure cookie-based session
- Protected admin dashboard
- Update lead status
- Search leads
- Categorize leads into:
  - NEW
  - CONTACTED
  - CLOSED

---

# Data Model

The project uses a single table named **ClientData**.

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary key |
| FirstName | Text | Client first name |
| LastName | Text | Client last name |
| email | Text | Client email |
| budget | Text | Budget range |
| message | Text | Client message |
| status | Text | Lead status (NEW, CONTACTED, CLOSED) |
| created_at | Timestamp | Submission time |

### Lead Lifecycle

```
NEW
   ↓
CONTACTED
   ↓
CLOSED
```

Every new form submission is automatically assigned:

```
status = NEW
```

---

# Authentication Flow

Authentication is implemented using **Supabase Auth** with secure **HTTP-only cookies**.

## Login Flow

1. User enters email and password.
2. Frontend sends POST request to:

```
POST /auth/login
```

3. Backend authenticates using:

```javascript
supabase.auth.signInWithPassword()
```

4. On success, backend stores:

- access_token
- refresh_token

inside **HTTP-only cookies**.

5. Frontend redirects to:

```
/admin
```

---

## Protected Route Flow

Whenever the Admin page loads:

```
GET /auth/me
```

The backend:

- Reads the access_token from cookies
- Verifies it using

```javascript
supabase.auth.getUser(token)
```

If valid:

```
200 OK
```

User information is returned.

Otherwise:

```
401 Unauthorized
```

and the frontend redirects to:

```
/login
```

---

# API Endpoints

## Submit Contact Form

```
POST /api/submit
```

Stores a new lead.

---

## Login

```
POST /auth/login
```

Authenticates the administrator.

---

## Current User

```
GET /auth/me
```

Returns the authenticated user.

---

## Fetch Leads

```
GET /api/ClientValue/:status
```

Returns all leads for the requested status.

Example:

```
GET /api/ClientValue/NEW
```

---

## Update Lead Status

```
PATCH /api/Client/:id/status
```

Request Body

```json
{
    "status": "CONTACTED"
}
```

---

# Project Structure

```
backend/
│
├── controllers/
├── routes/
├── services/
├── db/
├── core/
└── index.js

frontend/
│
├── app/
│   ├── admin/
│   ├── (auth)/
│   └── components/
│
├── lib/
└── public/
```

---

# Authentication Security

- HTTP-only Cookies
- Supabase Authentication
- Cookie-based session
- Protected Admin Route
- Backend token verification
- CORS configured with credentials

---

# User Flow

```
Visitor
   │
   ▼
Contact Form
   │
   ▼
Express Backend
   │
   ▼
Supabase Database
   │
   ▼
Lead Stored (NEW)
   │
   ▼
Admin Login
   │
   ▼
HTTP-only Cookie Created
   │
   ▼
Admin Dashboard
   │
   ▼
Update Status
   │
   ▼
CONTACTED / CLOSED
```

---

# Loom Demo

Include your Loom recording here:

```
https://www.loom.com/share/YOUR_VIDEO_LINK
```

The demo should cover:

- Contact form submission
- Lead saved in Supabase
- Admin login
- Authentication
- Viewing leads
- Updating lead status
- Status reflected in the dashboard

---

# Future Improvements

- Pagination
- Filters
- Email notifications
- Lead assignment
- Audit logs
- Role-based authentication