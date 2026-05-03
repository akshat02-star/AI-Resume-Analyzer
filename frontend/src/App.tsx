import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DashboardPage } from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
