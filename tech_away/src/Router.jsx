import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Teste from "./pages/Teste";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPageClient from "./pages/Auth/RegisterPageClient";
import LoginPageClient from "./pages/Auth/LoginPageClient";
import LayoutPage from "./pages/LayoutPage";
import { getLoggedUser } from "./utils/auth";

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
    <BrowserRouter>	
      <Routes>
        <Route path="/" element={<LayoutPage isUserLoggedIn={isUserLoggedIn} handle={handleLoginLogout}/>}>
					<Route index element={<HomePage />} />

					<Route path="/teste" element={<Teste />} />


          <Route path="/register" element={<RegisterPageClient />} />

          <Route path="/login" element={<LoginPageClient handle={handleLoginLogout}/>} />
					
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

