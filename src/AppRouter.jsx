import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Client from "./Client";
import AdminPanel from "./AdminPanel";
import StockManager from "./StockManager";
import NotAuthorized from "./NotAuthorized";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/client" element={<Client />} />
      <Route path="/admin-panel" element={<AdminPanel />} />
      <Route path="/stock-manager" element={<StockManager />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />
    </Routes>
  );
}