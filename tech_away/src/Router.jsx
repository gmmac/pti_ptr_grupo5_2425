import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Teste from "./pages/Teste";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPageClient from "./pages/Auth/RegisterPageClient";
import LoginPageClient from "./pages/Auth/LoginPageClient";
import LayoutPage from "./pages/LayoutPage";

export default function Router() {
  return (
    <BrowserRouter>	
      <Routes>
        <Route path="/" element={<LayoutPage />}>
					<Route index element={<HomePage />} />

					<Route path="/teste" element={<Teste />} />


          <Route path="/register" element={<RegisterPageClient />} />

          <Route path="/login" element={<LoginPageClient />} />
					
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

