# 📋 Task Manager

> A full-stack web application for managing personal tasks with user authentication. Users can register, log in, create, update, delete, and view their tasks in a clean, responsive interface.

## 🏢 Yunometa Company Assignment

> This project was developed as part of a **Yunometa Company** assignment to demonstrate full-stack development capabilities. The Task Manager application showcases proficiency in modern web technologies, database management, authentication systems, and responsive UI design.

### 🎯 Assignment Objectives
- **Full-Stack Development**: Implement both frontend and backend components
- **Authentication System**: Secure user registration and login functionality
- **Database Integration**: MongoDB integration with Mongoose ODM
- **RESTful API**: Well-structured API endpoints for CRUD operations
- **Modern UI**: Responsive design using React and Bootstrap
- **Security Best Practices**: JWT authentication and password hashing
- **Error Handling**: Comprehensive error management throughout the application

### 📈 Technical Demonstrated Skills
- **Frontend**: React hooks, state management, routing, API integration
- **Backend**: Express.js, middleware, route handling, database operations
- **Database**: Schema design, relationships, indexing, validation
- **Security**: Authentication, authorization, data validation, CORS
- **Development**: Environment configuration, build tools, version control

![Task Manager](https://img.shields.io/badge/Task-Manager-blue?style=for-the-badge&logo=todoist)
![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)

## 🌐 Live Demo

> **🚀 Check out the live demo here:** [Task Manager Live Demo](https://your-demo-link-here.com)

> **📝 Demo Credentials:**
> - **Email:** 1.user@example.com , 2.user1@example.com
> - **Password:** user123 , 2.user123

> **⚠️ Note:** The demo is hosted on a free platform and may take a few moments to load on first visit.

## ✨ Features

### 👤 User Management
- **🔐 Secure Registration**: User registration with email validation, username uniqueness, and password strength requirements
- **🎫 JWT Authentication**: Secure login with JSON Web Tokens for session management
- **👤 Profile Management**: View and update user profile including first name, last name, and avatar
- **🔑 Password Management**: Change password functionality with secure hashing
- **📊 Account Status**: Active/inactive account management with last login tracking

### 📝 Task Management
- **⚡ CRUD Operations**: Create, read, update, and delete tasks
- **📊 Task Status**: Track task progress with statuses: pending, in-progress, completed
- **🎯 Priority Levels**: Assign priority levels: low, medium, high
- **📅 Due Dates**: Set and track due dates for tasks
- **📋 Subtasks**: Break down tasks into smaller subtasks with completion tracking
- **🏷️ Tags**: Categorize tasks with custom tags for better organization
- **🔍 Search Functionality**: Full-text search across task titles, descriptions, and tags
- **🔒 User-Specific Tasks**: Each user has their own isolated task list

### 🎨 User Interface
- **📱 Responsive Design**: Mobile-friendly interface built with Bootstrap
- **🧭 Intuitive Navigation**: Clean navbar with easy access to tasks and profile
- **🃏 Task Cards**: Visual task representation with status indicators
- **✅ Form Validation**: Client-side and server-side validation for all inputs
- **⏳ Loading States**: User feedback during API calls and page loads

### 🚀 API Features
- **🔌 RESTful Endpoints**: Well-structured API with consistent response formats
- **🛡️ Authentication Middleware**: Protected routes with JWT verification
- **⚠️ Error Handling**: Comprehensive error responses and logging
- **🌐 CORS Support**: Cross-origin resource sharing for frontend integration
- **💓 Health Check**: Server health monitoring endpoint

## 🛠️ Technology Stack

### 🎯 Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
- **Node.js** - JavaScript runtime
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
- **Express.js** - Web framework
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
- **MongoDB** - NoSQL database
![Mongoose](https://img.shields.io/badge/Mongoose-820000?style=flat-square&logo=mongoose&logoColor=white)
- **Mongoose** - MongoDB object modeling
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
- **JWT** - JSON Web Tokens for authentication
![bcryptjs](https://img.shields.io/badge/bcryptjs-000000?style=flat-square)
- **bcryptjs** - Password hashing
![CORS](https://img.shields.io/badge/CORS-000000?style=flat-square)
- **CORS** - Cross-origin resource sharing

### 🎨 Frontend
![React](https://img.shields.io/badge/React-61dafb?style=flat-square&logo=react&logoColor=black)
- **React 19.2.0** - UI library
![Vite](https://img.shields.io/badge/Vite-646cff?style=flat-square&logo=vite&logoColor=white)
- **Vite** - Build tool and development server
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952b3?style=flat-square&logo=bootstrap&logoColor=white)
- **Bootstrap 5** - CSS framework
![Axios](https://img.shields.io/badge/Axios-5a29e4?style=flat-square&logo=axios&logoColor=white)
- **Axios** - HTTP client for API calls
![React Router](https://img.shields.io/badge/React_Router-ca4245?style=flat-square&logo=reactrouter&logoColor=white)
- **React Router DOM** - Client-side routing

## 📋 Prerequisites

- ![Node.js](https://img.shields.io/badge/Node.js-14+-green?style=flat-square&logo=node.js) Node.js (version 14 or higher)
- ![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green?style=flat-square&logo=mongodb) MongoDB (local installation or cloud service like MongoDB Atlas)
- ![npm](https://img.shields.io/badge/npm-6.0+-red?style=flat-square&logo=npm) npm or yarn package manager

## 🚀 Installation

### 1️⃣ Clone the repository
```bash
git clone <repository-url>
cd task-manager
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:
```env
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

Start the backend server:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

## 🎯 Usage

1. 🌐 Open your browser and navigate to `http://localhost:5173` (frontend)
2. 👤 Register a new account or login with existing credentials
3. ✅ Once logged in, you can:
   - 📋 View your task list
   - ➕ Create new tasks
   - ✏️ Edit existing tasks
   - 🗑️ Delete tasks
   - 👤 Update your profile

The backend API will be running on `http://localhost:5000`.

## 📚 API Endpoints

### 🔐 Authentication Routes (`/api/auth`)
- `POST /register` - 📝 Register a new user
- `POST /login` - 🔑 Login user
- `GET /profile` - 👤 Get user profile (protected)
- `PUT /profile` - ✏️ Update user profile (protected)
- `PUT /change-password` - 🔑 Change user password (protected)

### 📝 Task Routes (`/api/tasks`)
- `GET /` - 📋 Get all tasks for the authenticated user (protected)
- `POST /` - ➕ Create a new task (protected)
- `PUT /:id` - ✏️ Update a task by ID (protected)
- `DELETE /:id` - 🗑️ Delete a task by ID (protected)

> 🔒 All task routes require authentication via JWT token in the Authorization header.

## 📁 Project Structure

```
task-manager/
├── 📂 backend/
│   ├── 📂 config/
│   │   └── 📄 db.js
│   ├── 📂 controllers/
│   │   ├── 📄 authController.js
│   │   └── 📄 taskController.js
│   ├── 📂 middleware/
│   │   └── 📄 authMiddleware.js
│   ├── 📂 models/
│   │   ├── 📄 User.js
│   │   └── 📄 Task.js
│   ├── 📂 routes/
│   │   ├── 📄 authRoutes.js
│   │   └── 📄 taskRoutes.js
│   ├── 📄 server.js
│   ├── 📄 package.json
│   └── 🔒 .env (create this file)
├── 📂 frontend/
│   ├── 📂 public/
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   ├── 📂 pages/
│   │   ├── 📂 services/
│   │   ├── 📄 App.jsx
│   │   └── 📄 main.jsx
│   ├── 📄 package.json
│   └── ⚙️ vite.config.js
└── 📖 README.md
```

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔃 Open a Pull Request

                         ┌────────────────────────────────┐
                         │          CLIENT (UI)           │
                         │        React + Vite +          │
                         │   Axios + Bootstrap + Router   │
                         └────────────────────────────────┘
                                      │
                                      │  HTTP Requests (Axios)
                                      ▼
                         ┌────────────────────────────────┐
                         │       FRONTEND LAYER           │
                         │ - Login / Register Pages       │
                         │ - Tasks Page (CRUD UI)         │
                         │ - Profile Page                 │
                         │ - State Management (Hooks)     │
                         │ - Form Validation              │
                         └────────────────────────────────┘
                                      │
                                      │  API Calls (JSON)
                                      ▼
                 ┌─────────────────────────────────────────────────┐
                 │                 BACKEND API                     │
                 │            Node.js + Express.js                 │
                 ├─────────────────────────────────────────────────┤
                 │  ROUTES (REST API)                              │
                 │  /api/auth                                      │
                 │     ├── POST /register                          │
                 │     ├── POST /login                             │
                 │     ├── GET /profile (Protected)                │
                 │     ├── PUT /profile (Protected)                │
                 │     └── PUT /change-password (Protected)        │
                 │                                                 │
                 │  /api/tasks                                     │
                 │     ├── GET /   (Protected)                     │
                 │     ├── POST /  (Protected)                     │
                 │     ├── PUT /:id (Protected)                    │
                 │     └── DELETE /:id (Protected)                 │
                 ├─────────────────────────────────────────────────┤
                 │  MIDDLEWARE                                     │
                 │  - authMiddleware (JWT Verification)            │
                 │  - Error Handler                                │
                 ├─────────────────────────────────────────────────┤
                 │  CONTROLLERS                                    │
                 │  - authController.js                            │
                 │  - taskController.js                            │
                 └─────────────────────────────────────────────────┘
                                      │
                                      │  Mongoose Queries
                                      ▼
                         ┌────────────────────────────────┐
                         │        DATABASE LAYER          │
                         │     MongoDB + Mongoose         │
                         ├────────────────────────────────┤
                         │   Collections:                 │
                         │   - users                      │
                         │       • firstname              │
                         │       • lastname               │
                         │       • email                  │
                         │       • password (hashed)      │
                         │       • avatar                 │
                         │       • lastLogin              │
                         │                                │
                         │   - tasks                      │
                         │       • title                  │
                         │       • description            │
                         │       • status                 │
                         │       • priority               │
                         │       • tags                   │
                         │       • dueDate                │
                         │       • subtasks               │
                         │       • userId (FK)            │
                         │                                │
                         └────────────────────────────────┘
                                      ▲
                                      │
                                      │ DB Connection (MONGO_URI)
                                      │
                         ┌────────────────────────────────┐
                         │     ENVIRONMENT CONFIG         │
                         │     (.env File Settings)       │
                         │  - MONGO_URI                   │
                         │  - JWT_SECRET                  │
                         │  - PORT                        │
                         └────────────────────────────────┘

## 📄 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgments

- ![React](https://img.shields.io/badge/React-61dafb?style=flat-square&logo=react&logoColor=black) React team for the amazing UI library
- ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952b3?style=flat-square&logo=bootstrap&logoColor=white) Bootstrap for the beautiful UI components
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) MongoDB for the powerful database solution

---

<div align="center">
  <p> Made with ❤️ by Shiva </p>
  <p> ⭐ If you like this project, give it a star! </p>
</div>
