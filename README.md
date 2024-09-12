# PizzaPlaza-Ecommerce-Website

## Introduction

Welcome to the PizzaPlaza Online Pizza Ordering Application! This project is a full-stack e-commerce platform designed to provide a seamless pizza ordering experience for customers. It includes a React front-end, a Spring Boot back-end, and microservices for handling various functionalities.

## Technologies Used

- **Front End:** React
- **Back End:** Spring Boot
- **Database:** MySQL

## Microservices

- API Gateway
- User Management Service
- Menu Management Service
- Cart Management Service
- Order Management Service
- E-mail Service
- Admin Management System

## Demo

Check out the [YouTube demo](https://youtu.be/Wjo0yd7lQNU?si=x1iXQbuW0vfhAC4v) to see the PizzaPlaza application in action.

## Getting Started

1. **MySQL Database Setup**

   - Import the MySQL database into your local MySQL instance. The `.sql` file for the database is located in the `database` folder of this repository.
   - Update the `application.properties` or `application.yml` files in all Spring Boot microservices with your MySQL username and password.

     Example of `application.properties` update:

     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
     spring.datasource.username=your_mysql_username
     spring.datasource.password=your_mysql_password
     ```

2. **Spring Boot Microservices**

   After configuring the MySQL credentials, you can run all microservices using IntelliJ IDEA. Ensure all services are running for the application to function correctly.

3. **Front-End - Installation**

   To install dependencies and run the front-end application, follow these steps:

   - Navigate to the `frontend` directory:

     ```bash
     cd frontend
     ```

   - Install the required dependencies:

     ```bash
     npm install
     ```

   - Start the front-end development server:

     ```bash
     npm run dev
     ```

