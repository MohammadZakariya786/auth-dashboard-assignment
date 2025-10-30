# Auth Dashboard (Frontend + Backend)

## 🎥 Demo Video
Watch the demo here: [YouTube Unlisted Link](Add your demo link here)

# Full-Stack Authentication Dashboard

This is a full-stack authentication and task management dashboard built with modern web technologies.
It demonstrates secure login/signup with JWT, profile management, CRUD operations on tasks, real-time filtering/search, and responsive UI.

## Overview

This repository contains:
- Backend: Express + MongoDB that provides authentication, user management, and task APIs
- Frontend: React + Vite UI that implements protected routes and secure API consumption

## Tech Stack

- Frontend: React (Vite) + TailwindCSS + Axios + React Router
- Backend: Node.js + Express + MongoDB + JWT + bcrypt
- Database: MongoDB

## Prerequisites

- Node.js (16+)
- npm
- MongoDB connection string (Atlas or local)


## 📸 Screenshots

<p align="center">
   <a href="/screenshots/Dashboard%20overview.png"><img src="/screenshots/Dashboard%20overview.png" alt="Dashboard overview" width="380"/></a>
   <a href="/screenshots/tasks-list.png"><img src="/screenshots/tasks-list.png" alt="Tasks list" width="380"/></a>
</p>

<p align="center">
   <a href="/screenshots/task-search.png"><img src="/screenshots/task-search.png" alt="Task search" width="300"/></a>
   <a href="/screenshots/task-filter-status.png"><img src="/screenshots/task-filter-status.png" alt="Task filter by status" width="300"/></a>
   <a href="/screenshots/task-add.png"><img src="/screenshots/task-add.png" alt="Add new task" width="300"/></a>
</p>

<p align="center">
   <a href="/screenshots/task-edit.png"><img src="/screenshots/task-edit.png" alt="Edit task" width="300"/></a>
   <a href="/screenshots/login.png"><img src="/screenshots/login.png" alt="Login screen" width="300"/></a>
   <a href="/screenshots/signup%28validation%20errors%29.png"><img src="/screenshots/signup%28validation%20errors%29.png" alt="Signup validation errors" width="300"/></a>
</p>

<p align="center">
   <a href="/screenshots/profile-view.png"><img src="/screenshots/profile-view.png" alt="Profile view" width="360"/></a>
   <a href="/screenshots/profile-edit.png"><img src="/screenshots/profile-edit.png" alt="Profile edit" width="360"/></a>
</p>

Click any image to view full-size.

Notes:
- Images are stored in the repository under the `/screenshots/` folder. If you rename or move files, update the paths above.
- Filenames with spaces or special characters are URL-encoded in the links (e.g. `Dashboard%20overview.png`, `signup%28validation%20errors%29.png`).


## Setup

1. Start backend
   ```sh
   cd backend
   npm install
   ```
   - Ensure backend env config is present at `backend/.env` (contains `MONGODB_URI`, `JWT_SECRET`, `PORT`)
   - Start dev server:
   ```sh
   npm run dev
   ```
   - Default backend API base: `http://localhost:5000/api`

2. Start frontend
   ```sh
   cd frontend
   npm install
   npm run dev
   ```
   - The frontend reads `VITE_API_URL` from `frontend/.env`
   - Open the Vite dev URL (typically `http://localhost:5173`)

## Where to look in the code

- Backend entry: [backend/server.js](backend/server.js)  
- Backend routes:
  - Auth: [backend/routes/authRoutes.js](backend/routes/authRoutes.js)
  - Users: [backend/routes/userRoutes.js](backend/routes/userRoutes.js)
  - Tasks: [backend/routes/taskRoutes.js](backend/routes/taskRoutes.js)
- Backend models:
  - [`User`](backend/models/User.js)
  - [`Task`](backend/models/Task.js)
- Frontend main app: [frontend/src/App.jsx](frontend/src/App.jsx)
- Frontend components:
  - [`ProtectedRoute`](frontend/src/components/ProtectedRoute.jsx)
  - [`Navbar`](frontend/src/components/Navbar.jsx)
  - [`TaskForm`](frontend/src/components/TaskForm.jsx)
- Frontend pages:
  - [`Login`](frontend/src/pages/Login.jsx)
  - [`Signup`](frontend/src/pages/Signup.jsx)
  - [`Dashboard`](frontend/src/pages/Dashboard.jsx)
  - [`Profile`](frontend/src/pages/Profile.jsx)
  - [`TaskList`](frontend/src/pages/TaskList.jsx)

## Quick run checklist

1. Backend: `cd backend && npm run dev` — check console for MongoDB connection and server status
2. Frontend: `cd frontend && npm run dev` — open Vite URL
3. Verify signup/login flow and protected routes work


## Frontend Features

- ✅ Secure user authentication
- ✅ Protected routes implementation
- ✅ User registration and login
- ✅ Task management interface
- ✅ User profile management
- ✅ Responsive dashboard layout
- ✅ Client validation
- ✅ JWT token handling
- ✅ Error handling and notifications

## Important API endpoints

- ✅ POST /api/auth/register — User registration
- ✅ POST /api/auth/login — User authentication
- ✅ GET /api/users/me — Get user profile
- ✅ PUT /api/users/me — Update user profile
- ✅ GET /api/tasks — Get user tasks
- ✅ POST /api/tasks — Create new task
- ✅ PUT /api/tasks/:id — Update task
- ✅ DELETE /api/tasks/:id — Delete task

## Database Collections:

- ✅ users
- ✅ tasks

## Scaling Strategy for Production

### Frontend Scaling

1. **Performance Optimization**
   - Implement React.lazy() and Suspense for code splitting
   - Use React.memo() for expensive components
   - Implement service workers for offline capability
   - Use CDN for static assets delivery

2. **State Management**
   - Implement Redux for complex state management
   - Use Redux Toolkit for efficient state updates
   - Implement proper caching strategies
   - Use WebSocket for real-time updates

3. **Security Enhancements**
   - Implement refresh token mechanism
   - Use HttpOnly cookies for token storage
   - Add rate limiting for API requests
   - Implement proper CORS configuration

4. **Build Optimization**
   - Enable tree shaking
   - Implement proper chunk splitting
   - Optimize asset loading
   - Use compression for assets

### Backend Scaling

1. **Infrastructure**
   - Deploy using containerization (Docker)
   - Implement horizontal scaling with Kubernetes
   - Use load balancer (Nginx/HAProxy)
   - Implement caching layer (Redis)

2. **Database Optimization**
   - Implement database indexing
   - Use connection pooling
   - Set up database replication
   - Implement query optimization

3. **Security Measures**
   - Implement rate limiting
   - Use Helmet.js security headers
   - Implement IP blocking
   - Add request validation

4. **Monitoring & Logging**
   - Implement centralized logging (ELK Stack)
   - Use APM tools (New Relic/Datadog)
   - Implement error tracking (Sentry)
   - Set up performance monitoring

### API Scaling

1. **Performance**
   - Implement API caching
   - Use compression middleware
   - Optimize database queries
   - Implement connection pooling

2. **Security**
   - Add API versioning
   - Implement request validation
   - Use proper error handling
   - Add request throttling

3. **Documentation**
   - Implement Swagger/OpenAPI
   - Add API versioning
   - Maintain changelog
   - Document error codes

## Bonus Implementations

- ✅ JWT authentication with refresh tokens
- ✅ Comprehensive error handling
- ✅ Input validation and sanitization
- ✅ Secure password hashing
- ✅ Modular architecture
- ✅ Protected routes implementation

## Troubleshooting

- MongoDB connection error: verify `MONGODB_URI` in `backend/.env`
- JWT errors: check `JWT_SECRET` in backend environment
- Frontend API errors: verify `VITE_API_URL` in `frontend/.env`
- Check server logs for detailed error messages

## Helpful files
- [backend/package.json](backend/package.json)
- [frontend/package.json](frontend/package.json)
- [frontend/vite.config.js](frontend/vite.config.js)
- [backend/.env.example](backend/.env.example)

## License
MIT

---

This project demonstrates a secure, scalable architecture suitable for production deployment with proper authentication, authorization, and data management capabilities.