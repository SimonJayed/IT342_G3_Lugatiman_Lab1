# IT342_G3_Lugatiman_Lab1

## Project Description
A full-stack application with a Spring Boot backend and ReactJS frontend, demonstrating authentication and user profile management.

## Technologies Used
- **Backend**: Spring Boot, Spring Security, Spring Data JPA, Hibernate
- **Database**: MySQL
- **Frontend**: ReactJS, Vite, Axios, React Router
- **Build Tools**: Maven, NPM

## Steps to Run Backend
1. Navigate to `/backend`.
2. Ensure MySQL is running and `lab1_db` exists.
3. Run `mvn spring-boot:run`.

## Steps to Run Web App
1. Navigate to `/web`.
2. Run `npm install`.
3. Run `npm run dev`.

## Steps to Run Mobile App
(Not yet implemented)

## API Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `GET /api/user/me` - Get current user profile (Protected)
