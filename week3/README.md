# Fullstack Blog (React + Express + Supabase)

This repository contains a minimal Fullstack Blog/CMS system using React (Vite), Express.js, and Supabase.

Folder structure

- backend/ — Express API server
- frontend/ — Vite + React frontend

Quick setup

1. Create a Supabase project at https://supabase.com and get the `SUPABASE_URL` and `SUPABASE_KEY`.
2. In Supabase SQL editor, run the schema in `backend/README.md` to create `users`, `posts`, and `comments` tables.

Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env and set SUPABASE_URL, SUPABASE_KEY, JWT_SECRET
npm run dev
```

Frontend

```bash
cd frontend
npm install
# Optional: initialize Tailwind (already configured)
npm run dev
```

Deployment

- Backend (Render)
  - Create a new Web Service on Render.
  - Connect the GitHub repo branch and set the build and start commands: `npm install` and `npm start` (or use `npm run dev` for deploy preview if desired).
  - Add environment variables on Render: `SUPABASE_URL`, `SUPABASE_KEY`, `JWT_SECRET`, `PORT`.

- Frontend (Vercel)
  - Import the `frontend` folder as a new project on Vercel (link GitHub repo).
  - Set the build command to `npm run build` and the output directory to `dist` (Vite default).
  - Add environment variable `VITE_API_URL` if you want to point to the deployed backend.

GitHub repo

```bash
git init
git add .
git commit -m "Initial commit: fullstack blog scaffold"
# create repo on GitHub and push
git remote add origin <your-repo-url>
git push -u origin main
```
