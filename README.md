# oppo-discord

A full-stack simplified Discord clone built for an internship technical task. It uses React, Express, MongoDB, Mongoose, JWT authentication, bcrypt password hashing, Axios, and Socket.io.

## Features

- Register and log in with JWT authentication
- Password hashing with bcrypt
- Protected chat screen
- Channels: `general`, `study`, `tech`, `random`
- Real-time messages with Socket.io
- Messages saved in MongoDB
- Previous messages load when switching channels
- Logout support
- Simple responsive Discord-style layout with pure CSS

## Project Structure

```text
oppo-discord/
  backend/
  frontend/
```

## Required Environment Variables

Create `backend/.env` from `backend/.env.example`.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/oppo-discord
JWT_SECRET=replace_this_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Optional frontend environment variables can be added in `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## How to Run

Install and start the backend:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Install and start the frontend in a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the frontend URL shown by Vite, usually:

```text
http://localhost:5173
```

Make sure MongoDB is running locally, or replace `MONGO_URI` with your MongoDB Atlas connection string.

## API Routes

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/messages/:channel
```

## Demo Video

Demo video placeholder: add your demo video link here.

## GitHub Repository

GitHub repository placeholder: add your repository link here.
