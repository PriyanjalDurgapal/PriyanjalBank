# Banking Web Application

This website is under active development. The functionalities described below reflect the webiste futurre functinality. Ongoing development efforts are focused on enhancing system stability, security, and feature completeness.

## Description

This is a **full‑stack Banking Web Application** built using **React with TypeScript** for the frontend and **Spring Boot** for the backend. The project simulates core banking operations such as account management, secure transactions, PIN verification, and role‑based access control. It is designed with a clean UI, modular architecture, and secure API communication.

The application supports multiple user roles with separate dashboards and permissions, ensuring that each user can only access features relevant to their role.

---

## Tech Stack

### Frontend

* React
* TypeScript
* Axios (API communication)
* React Router (navigation)
* Modern UI components (modular & reusable)

### Backend

* Spring Boot
* Java
* Spring Security
* JPA / Hibernate
* REST APIs
* PostgreSQL

---

## Key Features & Functionalities

### 1. Role‑Based Access Control (RBAC)

The system includes a **role‑based panel** with different permissions:

* **Admin Panel**

  * Manage customers
  * View all accounts
  * Monitor transactions
  * System‑level controls

* **Customer Panel**

  * View profile & account details
  * Secure PIN verification
  * Perform transactions (send money, recharge, etc.)
  * View transaction history

* **(Optional) Bank Staff / Manager Panel**

  * Approve or monitor transactions
  * Customer support operations

Each role has its **own dashboard and protected routes**.

---

### 2. Secure Authentication & Authorization

* Login with credentials
* PIN verification for sensitive operations
* JWT‑based authentication (if implemented)
* API protection using Spring Security

---

### 3. Account Management

* Create and manage bank accounts
* Link customers with accounts
* View balance and account status

---

### 4. Transaction System

* Send money between accounts
* Validate account numbers
* Handle insufficient balance cases
* Transaction history with timestamps
* Proper error handling and status codes

---

### 5. Frontend Highlights

* Modular component structure
* Reusable UI components
* API error handling and loaders
* Smooth navigation using React Router

---

## Project Structure

### Frontend (React + TypeScript)

```
/src
 ├── api
 ├── components
 ├── pages
 ├── layout
 ├── routes
 └── utils
```

### Backend (Spring Boot)

```
/src/main/java
 ├── controller
 ├── service
 ├── repository
 ├── entity
 └── security
```

---

## How to Run the Project

### Prerequisites

* Node.js (v16+ recommended)
* Java 17+
* Maven
* MySQL / PostgreSQL
* Git

---

### 1. Run Backend (Spring Boot)

```bash
git clone <backend-repo-url>
cd backend
mvn clean install
mvn spring-boot:run
```

Backend will start at:

```
http://localhost:8080
```

Make sure to:

* Configure `application.properties` with DB credentials
* Create required database tables (or enable JPA auto‑create)

---

### 2. Run Frontend (React + TypeScript)

```bash
git clone <frontend-repo-url>
cd frontend
npm install
npm run dev
```

Frontend will start at:

```
http://localhost:5173
```

(or as configured)

---

### 3. Environment Configuration

Create a `.env` file in the frontend:

```
VITE_API_BASE_URL=http://localhost:8080
```

---

## Future Enhancements

* OTP‑based transaction verification
* Transaction receipt download (PDF)
* Admin analytics dashboard
* Email & SMS notifications
* Audit logs

---

## Author

Developed by **Priyanjal**
Full‑Stack Developer (React + Spring Boot)

---

## License

This project is for learning and demonstration purposes.
