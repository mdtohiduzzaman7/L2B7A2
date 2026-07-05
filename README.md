# DevPulse - Internal Tech Issue & Feature Tracker

A RESTful API for managing software bugs and feature requests. The system provides secure authentication, role-based authorization, and issue management for contributors and maintainers.

## 🌐 Live URL

- **Live API:** [https://your-live-url.com](https://l2-b7-a2-dusky.vercel.app/)
- **GitHub Repository:** https://github.com/mdtohiduzzaman7/L2B7A2

---

# ✨ Features

- User Registration & Login with JWT Authentication
- Role-Based Authorization (Contributor & Maintainer)
- Secure Password Hashing using bcrypt
- Create, Read, Update, and Delete (CRUD) Issues
- Filter and Sort Issues
- Maintainer-only Issue Management
- Centralized Error Handling
- PostgreSQL Database with Raw SQL
- Environment Variable Support
- RESTful API Design

---

# 🛠 Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- pg (Native PostgreSQL Driver)
- bcrypt
- jsonwebtoken (JWT)
- dotenv
- cors

---

# ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/mdtohiduzzaman7/L2B7A2.git
```

### 2. Navigate to the Project

```bash
cd L2B7A2
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file and add:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

### 5. Start the Development Server

```bash
npm run dev
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |

## Issues

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/issues` | Create a new issue |
| GET | `/api/issues` | Get all issues |
| GET | `/api/issues/:id` | Get single issue |
| PATCH | `/api/issues/:id` | Update an issue |
| DELETE | `/api/issues/:id` | Delete an issue |

---

# 🗄 Database Schema Summary

## Users Table

| Column | Description |
|--------|-------------|
| id | Primary Key |
| name | User Name |
| email | Unique Email |
| password | Hashed Password |
| role | contributor / maintainer |
| created_at | Created Timestamp |
| updated_at | Updated Timestamp |

## Issues Table

| Column | Description |
|--------|-------------|
| id | Primary Key |
| title | Issue Title |
| description | Issue Description |
| type | bug / feature_request |
| status | open / in_progress / resolved |
| reporter_id | User ID of Reporter |
| created_at | Created Timestamp |
| updated_at | Updated Timestamp |
