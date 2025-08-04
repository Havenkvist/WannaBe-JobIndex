WannaBe JobIndex
What problem does this project solve?
Finding the right entry-level software development job can be overwhelming for new graduates and junior developers. Many job boards are cluttered with listings that aren't tailored to fresh talent, and companies struggle to effectively reach this specific audience.

WannaBe JobIndex is a simple, focused job board platform built specifically for newly graduated developers and junior software engineers, allowing companies to post jobs targeted at this group. It aims to bridge the gap between fresh talent seeking their first opportunities and companies eager to hire them.

Tech Stack
Next.js (React + TypeScript) – Frontend framework for server-side rendering and static site generation

GraphQL with Apollo – API layer for flexible and efficient data fetching

Prisma – ORM for database access and migrations

PostgreSQL – Relational database to store users, jobs, and company data

Apollo Server (Micro) – GraphQL server integrated into Next.js API routes

Getting Started
Prerequisites
Node.js (v18+ recommended)

PostgreSQL database (local or remote)

npm or yarn

Setup
Clone the repository

git clone https://github.com/Havenkvist/WannaBe-JobIndex.git
cd WannaBe-JobIndex

Install dependencies

npm install
npx prisma generate

or
yarn

Set up your environment variables

Create a .env.local file in the root with your database connection string:

DATABASE_URL=postgresql://user:password@localhost:5432/jobboard

Note: .env.local is gitignored by default, so your sensitive info won’t be pushed to GitHub.

Run database migrations and seed initial data

npx prisma migrate dev --name init
npm run seed

Run the development server

npm run dev

Open http://localhost:3000 to view the app.
