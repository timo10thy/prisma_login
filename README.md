# Prisma ORM with MySQL — Authentication API

An educational project built to learn and practice **Prisma ORM** with **MySQL**, featuring user registration and login with **JWT authentication**.

## 📚 Purpose

This project was built as part of a backend development learning exercise at **Blocfuse Labs (Web2 Cohort 3)**. It demonstrates how to:

- Set up Prisma ORM with a MySQL database
- Define and migrate database schemas
- Build a REST API with Express.js
- Hash passwords securely with bcrypt
- Authenticate users with JSON Web Tokens (JWT)

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Prisma 7
- **Database:** MySQL
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Dev Tools:** Nodemon, Prisma Studio

## 📁 Project Structure

```
Prisma/
├── config/
│   └── prisma.js        # Prisma client setup with MariaDB adapter
├── routes/
│   └── auth.js          # Register and login routes
├── prisma/
│   ├── schema.prisma    # Database schema and models
│   └── migrations/      # Migration history
├── .env                 # Environment variables (not pushed to GitHub)
├── server.js            # Express app entry point
└── package.json
```

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/timo10thy/<repo-name>.git
   cd <repo-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root:**
   ```
   DATABASE_URL="mysql://root:yourpassword@localhost:3306/prisma"
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=yourpassword
   MYSQL_DATABASE=prisma
   JWT_SECRET=your_jwt_secret
   ```

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🔌 API Endpoints

### Register
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "username": "John",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "userId": 1
  }
  ```

### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGci..."
  }
  ```

## 🗄 Database Schema

```prisma
model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
}
```

## 🔍 Prisma Studio

To visually inspect your database:
```bash
npx prisma studio
```
Opens at `http://localhost:5555`

## 📝 Notes
- Run `npx prisma generate` after any schema changes
- Run `npx prisma migrate dev` to apply schema changes to the database