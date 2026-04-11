# Real Estate Project

A full-stack application with a **Next.js** frontend and an **Express.js** backend powered by **Prisma ORM**.

---

## Project Structure

* **`/src`**: Frontend application (Next.js 14).
* **`/srv`**: Backend API (Express, Prisma, PostgreSQL).
---

## Getting Started

### 1. Prerequisites
* **Node.js**: v18.17.0 or higher.
* **PostgreSQL**: Ensure a database instance is running.
* **Git**: For version control.

### 2. Backend Setup (The API)
Navigate to the srv directory to install dependencies and set up the database.

```bash
cd srv
npm install

# Install everything (Root, Frontend, and Backend)
npm install && cd src && npm install && cd ../srv && npm install && cd ..

# Setup Database (Inside /srv)
cd srv
npx prisma migrate dev --name init
node db/data.js
cd ..

## Run the Application
npm run dev