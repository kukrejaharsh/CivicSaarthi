# CivicSaarthi

A comprehensive civic issue management system that enables citizens to report civic problems and allows municipal administrators to efficiently track, manage, and resolve these issues through a dedicated admin portal.

## Tasks Accomplished

- [x] **Backend Infrastructure:** Built Express.js server with MongoDB integration, JWT authentication, and RESTful API endpoints for issue management.
- [x] **User Authentication System:** Implemented secure registration/login with bcryptjs password hashing and JWT token-based authorization.
- [x] **Role-Based Admin Portal:** Developed React frontend with protected routes, department-specific dashboards, and issue resolution capabilities.
- [x] **Database Seeding System:** Created comprehensive seed script with realistic civic issues categorized by department (PWD, Sanitation, Traffic Police, etc.).
- [x] **Responsive UI/UX:** Integrated Tailwind CSS with Framer Motion animations, skeleton loading states, and mobile-responsive design.
- [x] **Issue Management Flow:** Implemented automatic department assignment based on issue classification and status tracking (Open/Closed).

## Technology Stack

This project leverages the following technologies:

- **[React](https://reactjs.org/):** Component-based frontend library for building interactive user interfaces with efficient state management and reusable components.
- **[Vite](https://vitejs.dev/):** Modern build tool providing fast development server and optimized production builds for React applications.
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework enabling rapid UI development with consistent design system and responsive layouts.
- **[Express.js](https://expressjs.com/):** Minimalist Node.js web framework for building robust RESTful APIs and handling server-side logic.
- **[MongoDB](https://www.mongodb.com/):** NoSQL database providing flexible document storage for user data and civic issue management.
- **[Mongoose](https://mongoosejs.com/):** Elegant MongoDB object modeling for Node.js providing schema-based solution for application data modeling.
- **[JWT](https://jwt.io/):** JSON Web Tokens for secure, stateless authentication and authorization between client and server.
- **[Framer Motion](https://www.framer.com/motion/):** Production-ready motion library for React enabling smooth animations and transitions.

## Key Features

- **Role-Based Access Control:** Department-specific dashboards where users only view and manage issues assigned to their role (PWD, Sanitation, Traffic Police, etc.).
- **Automatic Department Routing:** Smart classification system that automatically assigns issues to relevant departments based on issue type (potholes → PWD, traffic signals → Traffic Police).
- **Real-Time Issue Dashboard:** Live dashboard displaying all assigned issues with status tracking, loading states, and comprehensive error handling.
- **Secure Authentication Flow:** JWT-based login system with password hashing, protected routes, and automatic token validation.
- **Issue Resolution Management:** Comprehensive issue lifecycle from creation to closure with status updates and detailed information views.
- **Database Seeding Capabilities:** Pre-configured sample data including realistic civic issues across multiple departments for quick development and testing.

## Local Setup Instructions (Windows & macOS)

Follow these steps to run the project locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/kukrejaharsh/CivicSaarthi.git
   cd CivicSaarthi
   ```

2. **Backend Setup**
   ```bash
   cd "Admin Portal/server"
   npm install
   
   # Windows
   echo MONGO_URI=your_mongodb_connection_string > .env
   echo JWT_SECRET=your_jwt_secret_key >> .env
   echo PORT=5000 >> .env
   
   # macOS/Linux
   echo "MONGO_URI=your_mongodb_connection_string" > .env
   echo "JWT_SECRET=your_jwt_secret_key" >> .env
   echo "PORT=5000" >> .env
   
   # Seed database with sample data
   node seedDB/seedDb.js
   
   # Start backend server
   npm start
   ```

3. **Frontend Setup**
   ```bash
   # Open new terminal/command prompt
   cd "Admin Portal/client"
   npm install
   
   # Start development server
   npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - MongoDB: Ensure your MongoDB connection string is valid

5. **Optional: Reset Database**
   ```bash
   cd "Admin Portal/server"
   node seedDB/seedDb.js -d  # Destroys all seeded data
   ```

**Prerequisites:** Node.js (v16+), MongoDB (local/Atlas), npm/yarn package manager

**Sample Login:** Use the seeded user accounts or register new users through the signup page. Each user role (PWD, Sanitation Dept, Traffic Police, Municipal Lighting Division, Health/Sanitation Wing) will only see issues assigned to their department.
