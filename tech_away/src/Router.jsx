import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPageClient from "./pages/Auth/RegisterPageClient";
import LoginPageClient from "./pages/Auth/LoginPageClient";
import ChangePasswordClient from "./pages/Auth/ChangePasswordClient";

import LayoutPage from "./pages/Layout/LayoutPage";

import EmployeeRegisterPage from "./pages/Employee/EmployeeRegisterPage";
import EmployeeLoginPage from "./pages/Employee/EmployeeLoginPage";
import EmployeeProtectedRoute from "./contexts/protectedRoutes/EmployeeProtectedRoute";
import EmployeeHomePage from "./pages/Employee/EmployeeHomePage";

import InterestsPage from "./pages/InterestsPage";
import { InterestsFilterProvider } from "./contexts/InterestsFilterProvider";
import StorePurchasePage from "./pages/StorePurchasePage";
import StorePage from "./pages/StorePage";
import EquipmentSheetPage from "./pages/EquipmentSheetPage";
import UsedEquipmentPage from "./pages/UsedEquipmentPage";

import { IsMobileProvider } from "./contexts/IsMobileContext";
import AuthProvider from "./contexts/AuthenticationProviders/AuthProvider";
import EmployeeAuthProvider from "./contexts/AuthenticationProviders/EmployeeAuthProvider";

import TestPage from "./pages/TestPage";

export default function Router() {
  return (
    <IsMobileProvider>
      <BrowserRouter>
        <Routes>

          <Route path="*" element={<NotFoundPage />} />

          {/* Rotas do Client */}
          <Route
            path="/"
            element={
              <AuthProvider>
                <LayoutPage />
              </AuthProvider>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="store" element={<StorePage />} />
            <Route path="store/:equipmentSheetName" element={<EquipmentSheetPage />} />
            <Route path="store/:equipmentSheetName/:usedEquipmentID" element={<UsedEquipmentPage />} />
            <Route path="changePassword" element={<ChangePasswordClient />} />
            <Route path="storePurchasePage" element={<StorePurchasePage />} />
            <Route path="register" element={<RegisterPageClient />} />
            <Route path="login" element={<LoginPageClient />} />
            <Route
              path="interests"
              element={
                <InterestsFilterProvider>
                  <InterestsPage />
                </InterestsFilterProvider>
              }
            />
          </Route>

          {/* Rotas do Employee */}
          <Route
            path="/employee"
            element={
              <EmployeeAuthProvider>
                <Outlet />
              </EmployeeAuthProvider>
            }
          >
          
            <Route element={<EmployeeProtectedRoute />}>
              <Route index element={<EmployeeHomePage />} />
            </Route>
            <Route path="teste" element={<TestPage />} />
            <Route path="login" element={<EmployeeLoginPage />} />
            <Route path="register" element={<EmployeeRegisterPage />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </IsMobileProvider>
  );
}
