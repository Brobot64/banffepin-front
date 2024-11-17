# Banff E-Pin Frontend

Welcome to the Banff E-Pin Frontend repository! This project is a web application designed for managing and purchasing electronic pins (E-Pins) for various telecom providers. The application allows users to register, log in, create orders, and manage their transactions seamlessly.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [API Integration](#api-integration)

## Project Overview

The Banff E-Pin Frontend is built using React and provides a user-friendly interface for users to interact with the backend services. The application supports user authentication, order management, and transaction history viewing. 

### Key Components

- **User   Registration and Login**: Users can create an account and log in to access their dashboard.
- **Order Management**: Users can create, view, and manage their E-Pin orders.
- **Transaction History**: Users can view their past transactions and order details.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Router**: For routing and navigation within the application.
- **Axios**: For making HTTP requests to the backend API.
- **CSS/SCSS**: For styling the application.
- **JavaScript ES6+**: For modern JavaScript features.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Brobot64/banffepin-front.git

    ```

2. **Navigate to the project directory**:
``` bash
cd banffepin-front
```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Start the development server**:
    ```bash
    npm start
    ```

5. **Open your browser** and navigate to **http://localhost:3000** to view the application.


## Usage
Once the application is running, users can:

- **Register**: Fill out the registration form to create a new account
- **Log In**: Use the registered credentials to log in.
- **Create Orders**: Select a telecom provider and denomination to create an order.
- **View Transaction History**: Access the history of all transactions made.



## Features
- User authentication (registration and login)
- Create and manage E-Pin orders
- View transaction history
- Responsive design for mobile and desktop views
- Error handling and user feedback


## Folder Structure
The project follows a structured folder organization for better maintainability:

```
src/
├── components/          # Reusable components
│   ├── Login.jsx       # Login component
│   ├── RegisterUser .jsx# Registration component
│   ├── OrderConfirmation.jsx # Order confirmation component
│   └── ...             # Other components
├── screens/            # Screen components
│   ├── LoginRemake.jsx # Login screen
│   ├── Dashboard.jsx    # Dashboard screen
│   └── ...             # Other screens
├── backies/            # API integration
│   ├── schedulers.js   # API functions for user and order management
│   └── ...             # Other API functions
├── App.jsx             # Main application component
└── index.js            # Entry point of the application
```


## API Integration
The application communicates with a backend API for user authentication and order management. The API endpoints are defined in the backies/schedulers.js file. Ensure that the backend service is running and accessible for the frontend to function correctly.

### Example API Endpoints
- **POST /api/register**: Register a new user
- **POST /api/login**: Authenticate a user
- **POST /api/orders**: Create a new order
- **GET /api/orders/history**: Retrieve transaction history

