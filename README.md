

# LensCure Frontend (React)  

**🔗 Backend API:** [Spring Boot Server](https://github.com/Aounil/LensCure-Backend)  

A **responsive React dashboard** for LensCure, featuring:  
- **Multi-role UI** (Admin/Client/Stock Manager)  
- **JWT Auth** with protected routes  
- **Shopping Cart** with real-time updates  
- **Admin Panel** for user management  

## 🎨 Features  

| Feature               | Tech Used               |  
|-----------------------|-------------------------|  
| **Auth Flow**         | JWT + React Context     |  
| **Role-Based UI**     | Dynamic Routing         |  
| **Cart Management**   | Context API + LocalStorage |  
| **API Calls**         | `fetch` with JWT        |  

## ⚡ Tech Stack  
- **Frontend**: React 18, Vite (if used)  
- **Routing**: React Router v6  
- **Styling**: Bootstrap/CSS Modules  
- **State**: Context API (Auth + Cart)  
- **Notifications**: React Toastify  

## 💻 Run Locally  
```bash
git clone https://github.com/Aounil/LensCure-Frontend.git
cd LensCure-Frontend
npm install
npm run dev  # http://localhost:3000
```
## 🔌 API Integration

Base URL: http://localhost:8080 (update for production)

Auth: JWT stored in localStorage

Example Request:

await fetch("/api/orders", {
  headers: { "Authorization": `Bearer ${token}` }
});
