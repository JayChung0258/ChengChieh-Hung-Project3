
# Twitter-Style Social Media App

This project is a simplified Twitter-style social media application that allows users to register, log in, post status updates, and view updates from all users. The app is designed with a full-stack architecture, using a Node.js and Express backend, MongoDB for data storage, and a React frontend. It provides basic features for user authentication, session management, and CRUD operations for posts.

---

## Features

### Core Features
- **User Registration and Login**:
  - Users can create an account with a unique username and password.
  - Secure authentication using JWT and cookies for session management.

- **Post Management**:
  - Logged-in users can create, edit, and delete their posts.
  - All users, even those not logged in, can view posts in chronological order.

- **User Profiles**:
  - Users can view individual profiles with details like username, join date, and all posts.
  - Logged-in users can update their own profile descriptions.

- **Responsive Navbar**:
  - Dynamic navigation based on login status, with links to home, login, register, and user profile.

### Additional Features
- Persistent session using cookies to ensure users remain logged in after page refreshes.
- RESTful API design with endpoints for authentication, posts, and user management.
- Secure password hashing with bcrypt.

---

## Technology Stack

### Frontend
- **React**: For building a responsive and interactive user interface.
- **CSS**: Custom styling for page layouts and components.

### Backend
- **Node.js** and **Express**: For handling API requests and routing.
- **JWT**: For secure authentication.
- **Cookie-Parser**: For managing cookies.

### Database
- **MongoDB**: For storing user information and posts.
- **Mongoose**: For schema definition and database operations.

---

## Setup and Installation

### Prerequisites
- Node.js and npm
- MongoDB (local or cloud, e.g., MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/twitter-style-app.git
   cd twitter-style-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` folder with the following:
     ```
     PORT=5000
     MONGODB_URI=your-mongodb-uri
     JWT_SECRET=your-jwt-secret
     NODE_ENV=development
     ```

4. Start the application:
   - Backend:
     ```bash
     cd backend
     npm run dev
     ```
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```

5. Access the app in your browser:
   - Development: `http://localhost:3000`
   - Production: Deployed URL (e.g., Render)

---

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in with a username and password.
- `POST /api/auth/logout`: Log out the user.
- `GET /api/auth/me`: Get the currently logged-in user's details.

### Posts
- `GET /api/posts`: Get all posts.
- `POST /api/posts`: Create a new post (logged-in users only).
- `PUT /api/posts/:id`: Edit a post (author only).
- `DELETE /api/posts/:id`: Delete a post (author only).

### Users
- `GET /api/users/:username`: Get user profile and posts.
- `PUT /api/users/:username`: Update user profile description (owner only).

---

## Deployment

The app is deployed using **Render**. Ensure the following steps are completed:
1. Set the root directory to the project root.
2. Use `npm install && npm run build` as the build command.
3. Use `npm run prod` as the start command.
4. Add environment variables:
   - `NODE_ENV=production`
   - `MONGODB_URI=your-mongodb-uri`
   - `JWT_SECRET=your-jwt-secret`

---

## Challenges and Lessons Learned

While building this project, I encountered challenges with:
- Managing cookies for persistent sessions.
- Debugging authentication issues during development and deployment.
- Ensuring seamless transitions between development and production environments.

These experiences helped me deepen my understanding of authentication, session management, and environment-specific configurations.

---

## Future Improvements

Given more time, I would:
- Enhance CSS styling for a more polished UI.
- Add additional features like image uploads for posts, user search functionality, and mobile responsiveness.
- Optimize database queries for better performance.

---

## License

This project is licensed under the MIT License.

