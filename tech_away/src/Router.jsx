import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Teste from "./pages/Teste";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPageClient from "./pages/Auth/RegisterPageClient";
import LoginPageClient from "./pages/Auth/LoginPageClient";
import StorePurchasePage from "./pages/StorePurchasePage";


import LayoutPage from "./pages/LayoutPage";
import EmployeeRegisterPage from "./pages/EmployeeRegisterPage";
import EmployeeLoginPage from "./pages/EmployeeLoginPage";
import EmployeeProtectedRoute from "./contexts/protectedRoutes/EmployeeProtectedRoute";
import EmployeeHomePage from "./pages/EmployeeHomePage";


import ChangePasswordClient from "./pages/Auth/ChangePasswordClient";
import InterestsPage from "./pages/InterestsPage";
import { InterestsFilterProvider } from "./contexts/InterestsFilterProvider";
import { getLoggedUser } from "./utils/auth";
import { IsMobileProvider } from "./contexts/IsMobileContext";

export default function Router() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(getLoggedUser() != null);

    useEffect(()=>{
        if(getLoggedUser()){
        console.log("esta logado")
        }
    }, [isUserLoggedIn])

    const handleLoginLogout = (bool) => {
        setIsUserLoggedIn(bool);
    };

  return (
    <IsMobileProvider>
    <BrowserRouter>	
      <Routes>
        <Route path="/" element={<LayoutPage isUserLoggedIn={isUserLoggedIn} handle={handleLoginLogout}/>}>
					{/* Cliente */}

          <Route index element={<HomePage />} />

					<Route path="/teste" element={<Teste />} />

          <Route path="/changePassword" element={<ChangePasswordClient />} />
            
          <Route path="/storePurchasePage" element={<StorePurchasePage />} />

          <Route path="/register" element={<RegisterPageClient />} />

          <Route path="/login" element={<LoginPageClient handle={handleLoginLogout}/>} />



          <Route path="employee">
            {/* public routes */}
            <Route path="login" element={<EmployeeLoginPage />} />

            {/* logged employee routes */}
            <Route element={<EmployeeProtectedRoute />}>
                <Route index element={<EmployeeHomePage />} />
            </Route>

            {/* admin employee routes */}
            {/* <Route element={<AdminProtectedRoute />}> */}
                <Route path="register" element={<EmployeeRegisterPage />} />
            {/* </Route> */}
          </Route>


          <Route
            path="/interests"
            element={
              <InterestsFilterProvider> {/* Fazer o filtro */}
                <InterestsPage />
              </InterestsFilterProvider>
            }
           />
					
         </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </IsMobileProvider>

  );
}

