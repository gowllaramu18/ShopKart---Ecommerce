# 🛒 ShopKart – Java Full Stack E-Commerce Application

A full-stack e-commerce application designed to provide a smooth online shopping experience. ShopKart is developed using **Java, Spring Boot, Spring Data JPA, Hibernate, MySQL, REST APIs, and React.js**.

## 🚀 Project Overview

ShopKart is an online shopping platform where users can interact with an e-commerce application through a React-based frontend and a Spring Boot backend.

The project focuses on developing RESTful APIs, database management, backend business logic, and frontend-backend integration.

## ✨ Features

### Backend
- User management module
- Product management module
- Order management module
- RESTful API development using Spring Boot
- Database operations using Spring Data JPA and Hibernate
- MySQL database integration
- Maven-based dependency management

### Frontend
- React.js-based user interface
- E-commerce application interface
- Frontend integration with backend APIs (in progress)

### In Development
- Shopping cart functionality
- User authentication and authorization
- Admin management features
- Complete frontend-backend integration

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Programming Language | Java |
| Backend Framework | Spring Boot 4.0.8 |
| ORM | Hibernate |
| Data Access | Spring Data JPA |
| Frontend | React.js |
| Database | MySQL 8 |
| API | REST APIs |
| Build Tool | Maven |
| IDE | IntelliJ IDEA |
| Database Tool | MySQL Workbench |
| Version Control | Git & GitHub |

## 📁 Project Structure

```text
ShopKart-Ecommerce/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/shopkart/backend/
│   │       │       ├── entity/
│   │       │       ├── repository/
│   │       │       ├── service/
│   │       │       └── controller/
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   ├── pom.xml
│   └── mvnw.cmd
│
├── frontend/
│   └── React application files
│
└── README.md
```

## ⚙️ Prerequisites

Make sure you have installed:

- Java JDK
- IntelliJ IDEA
- MySQL Server
- MySQL Workbench
- Node.js and npm
- Git

## 🗄️ Database Configuration

1. Open MySQL Workbench.
2. Create a database:

```sql
CREATE DATABASE shopkart;
```

3. Configure your database connection in:

`backend/src/main/resources/application.properties`

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/shopkart
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Keep your actual database password private. Do not commit credentials to GitHub.

## ▶️ Run the Backend

Open the backend folder in the terminal.

For Windows:

```bash
.\mvnw.cmd clean install
```

Start the Spring Boot application:

```bash
.\mvnw.cmd spring-boot:run
```

Backend server:

```text
http://localhost:8080
```

## ▶️ Run the Frontend

Open another terminal and navigate to the frontend folder.

```bash
cd frontend
npm install
npm run dev
```

Frontend development server:

```text
http://localhost:5173
```

## 🔗 API Development

The backend is organized into REST API modules.

| Module | Responsibility |
|---|---|
| Users | User registration and management |
| Products | Product management |
| Orders | Order management |
| Cart | Shopping cart functionality (in development) |

**Implemented registration endpoint:**

```http
POST /api/users/register
```

Additional endpoints will be documented as the modules are completed.

## 🔐 Security

Security and authentication features are part of the ongoing development roadmap. Production deployment will require secure credential management, authentication, authorization, and appropriate API protection.

## 📸 Screenshots

Screenshots of the application will be added here as frontend and backend integration progresses.

## 🚀 Future Enhancements

- JWT-based authentication
- Role-based access for Admin and Customers
- Shopping cart and checkout
- Online payment gateway integration
- Product search and filtering
- Order tracking
- Admin dashboard
- Responsive user interface
- Application deployment

## 👨‍💻 Developer

**Ramu Gowlla**

Aspiring Java Full Stack Developer

**Technical Skills:**
- Core Java
- Advanced Java
- Spring Boot
- React.js
- JavaScript
- HTML & CSS
- MySQL
- REST APIs

**GitHub:** https://github.com/gowllaramu18

---

⭐ If you find this project interesting, feel free to explore the repository and follow its development.

**Project:** ShopKart – Java Full Stack E-Commerce Application
