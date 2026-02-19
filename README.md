# IT342_G3_Lugatiman_Lab1

## Project Description
Grossery is a full-stack grocery planning and tracking application designed to help users manage their monthly consumption, reduce food waste, and track item expiry dates. It features a secure Spring Boot backend and a responsive ReactJS frontend.

## Technologies Used
- **Backend Framework**: Spring Boot 3.x
- **Security**: Spring Security, JWT (JSON Web Tokens), BCrypt
- **Database**: MySQL, Spring Data JPA, Hibernate
- **Frontend Library**: ReactJS (Vite)
- **Styling**: CSS Modules, Custom Design System
- **Build Tools**: Maven (Backend), NPM (Frontend)

## Steps to Run Backend
1.  Open the `/backend` folder in your IDE (IntelliJ IDEA recommended).
2.  Ensure you have **MySQL** running and a database named `grossery_v2` created.
    - *Note: The app is configured to `update` the schema automatically.*
3.  Run the application via the main class `Lab1Application.java` or use the terminal:
    ```bash
    cd backend
    ./mvnw spring-boot:run
    ```
4.  The backend will start on `http://localhost:8080`.

## Steps to Run Web App
1.  Navigate to the `/web` directory.
2.  Install dependencies:
    ```bash
    cd web
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` in your browser.

## Steps to Run Mobile App
*(Mobile Application implementation is currently in progress for Lab 2)*

## List of API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user account.
- `POST /api/auth/login` - Authenticate and receive a JWT.
- `POST /api/auth/logout` - Logout (Client-side token removal).

### User Profile
- `GET /api/user/me` - Retrieve the currently authenticated user's profile.

### Grocery Management (Upcoming)
- `GET /api/items` - List grocery items.
- `POST /api/items` - Add a new item.

