import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Teste from "./pages/Teste";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPageClient from "./pages/Auth/RegisterPageClient";
import LoginPageClient from "./pages/Auth/LoginPageClient";
import StorePurchasePage from "./pages/StorePurchasePage";

import LayoutPage from "./pages/Layout/LayoutPage";
import EmployeeLayoutPage from "./pages/Layout/EmployeeLayoutPage";
import EmployeeRegisterPage from "./pages/Employee/EmployeeRegisterPage";
import EmployeeLoginPage from "./pages/Employee/EmployeeLoginPage";
import EmployeeProtectedRoute from "./contexts/protectedRoutes/EmployeeProtectedRoute";
import EmployeeHomePage from "./pages/Employee/EmployeeHomePage";

import ChangePasswordClient from "./pages/Auth/ChangePasswordClient";
import InterestsPage from "./pages/InterestsPage";
import { InterestsFilterProvider } from "./contexts/InterestsFilterProvider";
import StorePurchasePage from "./pages/StorePurchasePage";
import LayoutPage from "./pages/LayoutPage"; // Importe o Layout
import StorePage from "./pages/StorePage";
import EquipmentSheetPage from "./pages/EquipmentSheetPage";
import UsedEquipmentPage from "./pages/UsedEquipmentPage";
import { getLoggedUser } from "./utils/auth";
import { IsMobileProvider } from "./contexts/IsMobileContext";

export default function Router() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(getLoggedUser() != null);

  const handleLoginLogout = (bool) => {
    setIsUserLoggedIn(bool);
  };

  return (
    <IsMobileProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas do Cliente */}
          <Route path="/" element={<LayoutPage isUserLoggedIn={isUserLoggedIn} handle={handleLoginLogout} />}>
            <Route index element={<HomePage />} />

            <Route path="/store" element={<StorePage />} />
            <Route path="/store/:equipmentSheetName" element={<EquipmentSheetPage />} />
            <Route path="/store/:equipmentSheetName/:usedEquipmentID" element={<UsedEquipmentPage />} />

            <Route path="/teste" element={<Teste />} />
            <Route path="/changePassword" element={<ChangePasswordClient />} />
            <Route path="/storePurchasePage" element={<StorePurchasePage />} />
            <Route path="/register" element={<RegisterPageClient />} />
            <Route path="/login" element={<LoginPageClient handle={handleLoginLogout} />} />
            <Route path="/interests" element={
              <InterestsFilterProvider>
                <InterestsPage />
              </InterestsFilterProvider>
            } />
          </Route>

          {/* Rotas do Funcionário */}
          <Route path="/employee" element={<EmployeeLayoutPage />}>
            <Route path="login" element={<EmployeeLoginPage />} />
            <Route element={<EmployeeProtectedRoute />}>
              <Route index element={<EmployeeHomePage />} />
            </Route>
            <Route path="register" element={<EmployeeRegisterPage />} />
          </Route>

          {/* Página de erro */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </IsMobileProvider>
  );
}
