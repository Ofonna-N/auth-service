# Full-Stack User Authentication Service

This repository contains a complete, standalone user authentication service implemented from first principles. It features a secure, session-based authentication system with username/password login, running in a containerized Docker environment.

The implementation follows modern security principles and a "glass box" approach where core logic is custom-built instead of relying on opaque libraries.

**Live Demo:** [https://auth-service](https://auth-service-woad.vercel.app/)

### Key Features

- **Secure User Registration:** New users can sign up with a unique username and a password.
- **Stateful Session Management:** Creates secure, server-side sessions upon successful login, using a modern ID/secret verifier pattern to prevent tampering.
- **Secure Password Hashing:** User passwords are never stored in plain text. They are securely hashed using the industry-standard **Argon2id** algorithm.
- **Protected Routes:** A server-side middleware acts as a gatekeeper, protecting sensitive pages (like the user dashboard) from unauthenticated access.
- **`HttpOnly` Cookies:** Session tokens are stored in secure, `HttpOnly` cookies to protect against XSS attacks.
- **RESTful API Endpoints:** Clean, well-structured API routes for `/signup`, `/login`, `/logout`, and fetching the current user (`/me`).

### Tech Stack & Core Concepts

This project utilizes a modern, robust tech stack to demonstrate proficiency across the development lifecycle.

| **Category**  | **Technology**                                                    |
| :------------ | :---------------------------------------------------------------- |
| **Framework** | Next.js 14 (App Router)                                           |
| **Frontend**  | React, Material-UI, TanStack Query, React Hook Form, Zod, Sonner  |
| **Backend**   | Next.js API Routes, TypeScript                                    |
| **Database**  | PostgreSQL                                                        |
| **ORM**       | Prisma                                                            |
| **Security**  | `argon2` for password hashing, Web Crypto API for session secrets |
| **DevOps**    | Docker & Docker Compose                                           |

**Core Security Concepts Implemented:**

- Password Hashing & Salting with Argon2id
- Stateful, Database-Backed Sessions
- Timing Attack Prevention with `constantTimeEqual`
- CSRF Protection with `SameSite=Lax` Cookies
- Server-Side Route Protection via Middleware

### Running Locally

This project is fully containerized with Docker, so you do not need to install Node.js or PostgreSQL on your host machine.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ofonna-N/auth-service
    cd auth-service
    ```
2.  **Create your local environment file:**
    Copy the example environment file to create your own local version.
    ```bash
    cp .env.example .env
    ```
    _No changes are needed in the `.env` file for local development._
3.  **Build and start the services:**
    This command will build the Docker images and start the Next.js app and PostgreSQL database containers in the background.
    ```bash
    docker-compose up -d --build
    ```
4.  **Run the initial database migration:**
    This command executes the Prisma migration inside the running `app` container to create your database tables.
    ```bash
    docker-compose exec app npx prisma migrate dev --name init
    ```
