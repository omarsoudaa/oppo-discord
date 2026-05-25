# Oppo Discord Clone

A simple real-time chat app inspired by Discord. It was built as a technical task for an internship application and shows how users can sign up, log in, switch channels, and chat in real time.

## Features

- User registration and login
- JWT authentication
- Multiple chat channels
- Real-time messaging using Socket.io
- Messages saved in MongoDB
- Simple responsive interface using Pure CSS

## Tech Stack

- Frontend: ReactJS, Axios, Pure CSS
- Backend: Node.js, ExpressJS, MongoDB, Mongoose, Socket.io
- Auth: JWT authentication, bcrypt

## Project Structure

- `backend` - server code, API endpoints, database setup, and real-time socket logic
- `frontend` - React app, UI components, and client-side chat logic
- `models` - MongoDB data models for users and messages
- `routes` - API routes for auth and messages
- `components` - reusable UI pieces like message input, chat list, and sidebar
- `pages` - main app pages like chat, login, and register

## How to Run the Project

1. Open a terminal and go to the backend folder:
   - `cd backend`
2. Install backend packages:
   - `npm install`
3. Create a `.env` file in the backend folder
4. Start the backend server:
   - `npm run dev`
5. Open another terminal and go to the frontend folder:
   - `cd frontend`
6. Install frontend packages:
   - `npm install`
7. Start the frontend app:
   - `npm run dev`

## Environment Variables

The backend needs these variables in `.env`:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL`

Do not put real secrets or passwords in the repo.

## Demo

A short demo video is available to show registration, login, channel switching, and real-time messaging.

## Notes

- Do not push `.env` to GitHub.
- Do not push `node_modules` to GitHub.
