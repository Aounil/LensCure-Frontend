
# LensCure Frontend

LensCure Frontend is a modern web application built with React that serves as the client-side interface for the LensCure platform — an online system for managing optical products, placing orders, and handling user roles (clients, admins, stock managers)

## Features

🛍️ Shopping Cart — Add, update, and remove items with live total calculation.

🔐 Authentication — Secure login/logout and protected routes using JWT.

🗂️ Role-Based Access — Admin, Client, and Stock Manager views.

🧾 Order Placement — Checkout process with real-time feedback.

⚙️ Admin Panel — Create and manage users with different roles.

✨ Modern UI — Built with React, React Router, Toastify, Bootstrap (or your styling).


## Tech Stack

React (frontend framework)

React Router (routing)

React Context API (state management for cart/auth)

Toastify (notifications)

Fetch API (for API calls with JWT)

Bootstrap or custom CSS (styling)



## Run Locally

Clone the project

```bash
  git clone git clone https://github.com/Aounil/LensCure-Frontend.git
```

Go to the project directory

```bash
  cd LensCure-Frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## API Reference
The frontend communicates with the LensCure Backend running on http://localhost:8080.

### Authentication: 
JWT stored in local storage.

### Secure Requests: 
fetchWithAuth helper adds JWT to requests.



## Authors

- [@Yassine Aounil](https://www.github.com/Aounil)

