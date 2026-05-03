# Team Task Manager MERN App

Full-stack assignment project with authentication, role-based access, project management, task assignment, status tracking, and dashboard.

## Tech Stack
- React + Tailwind CSS
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication

## Features
- Signup/Login
- Admin and Member roles
- Admin can create projects and tasks
- Members can see assigned tasks
- Task status: Pending, In Progress, Completed
- Dashboard: total, completed, pending, overdue

## Run Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Add your MongoDB URI and JWT secret in `.env`.

## Run Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## API Routes
- POST `/api/auth/signup`
- POST `/api/auth/login`
- GET `/api/auth/users` admin only
- GET `/api/projects`
- POST `/api/projects` admin only
- GET `/api/tasks`
- POST `/api/tasks` admin only
- PUT `/api/tasks/:id/status`
- GET `/api/tasks/dashboard`

## Deployment
Deploy backend and frontend on Railway. Set environment variables:
- Backend: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`
- Frontend: `VITE_BACKEND_URL`
