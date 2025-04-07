# WasteNotHub

WasteNotHub is a full-stack web application that enables users to view and donate unused or surplus products, as well as donate money to support food and material redistribution to those in need.

## Features

- User Authentication (Login/Signup)
- Product Listings
- Donation Management
- Agent Coordination
- User Profiles

## Tech Stack

- Frontend: React, Tailwind CSS, Shadcn UI
- Backend: Node.js, Express.js
- Database: PostgreSQL
- Authentication: Passport.js with session-based auth
- State Management: TanStack Query (React Query)
- Forms: React Hook Form with Zod validation

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Aman8959/WasteNotHub.git
   cd WasteNotHub
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   ```
   npm run db:push
   ```

## Running the Application

Start the development server:
```
npm run dev
```

The application will be available at http://localhost:3000.

## Project Structure

- /client - Frontend React application
  - /src/components - UI components
  - /src/hooks - Custom React hooks
  - /src/lib - Utility functions
  - /src/pages - Page components
  
- /server - Backend Express server
  - /routes.ts - API endpoints
  - /storage.ts - Data access layer
  - /auth.ts - Authentication setup
  - /db.ts - Database connection

- /shared - Shared code between frontend and backend
  - /schema.ts - Database schema and types

## License

This project is licensed under the MIT License.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Aman8959/WasteNotHub.git
   cd WasteNotHub
   ```

2. Install dependencies:
   ```
   npm run installation
   ```

3. Set up the database:
   ```
   npm run db:push
   ```
