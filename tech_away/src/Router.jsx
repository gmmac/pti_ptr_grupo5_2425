import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InterestsPage from "./pages/InterestsPage";
import Teste from "./pages/Teste";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import { InterestsFilterProvider } from "./contexts/InterestsFilterProvider";
import StorePurchasePage from "./pages/StorePurchasePage";
import LayoutPage from "./pages/LayoutPage";
import EmployeeRegisterPage from "./pages/EmployeeRegisterPage";
import EmployeeLoginPage from "./pages/EmployeeLoginPage";
import EmployeeProtectedRoute from "./contexts/protectedRoutes/EmployeeProtectedRoute";
import EmployeeHomePage from "./pages/EmployeeHomePage";
import AdminProtectedRoute from "./contexts/protectedRoutes/AdminProtectedRoute";

export default function Router() {
    return (
        <BrowserRouter>    
            <Routes>

                <Route path="/" element={<LayoutPage />}>
                    <Route index element={<HomePage />} />
                    
                    <Route path="auth" element={<AuthPage />} />


                    <Route path="teste" element={<Teste />} />
                    <Route path="storePurchasePage" element={<StorePurchasePage />} />
                    
                    <Route path="interests" element={
                        <InterestsFilterProvider> 
                            <InterestsPage />
                        </InterestsFilterProvider>
                    } />
                    


                    <Route path="employee">
                        {/* public routes */}
                        <Route path="login" element={<EmployeeLoginPage />} />

                        {/* logged employee routes */}
                        <Route element={<EmployeeProtectedRoute />}>
                            <Route index element={<EmployeeHomePage />} />
                        </Route>

                        {/* admin employee routes */}
                        <Route element={<AdminProtectedRoute />}>
                            <Route path="register" element={<EmployeeRegisterPage />} />
                        </Route>
                    </Route>

                </Route>

                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </BrowserRouter>
    );
}
