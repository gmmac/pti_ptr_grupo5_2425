import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InterestsPage from "./pages/InterestsPage";
import Teste from "./pages/Teste";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import { InterestsFilterProvider } from "./contexts/InterestsFilterProvider";
import StorePurchasePage from "./pages/StorePurchasePage";

export default function Router() {
  return (
    <BrowserRouter>	
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/teste" element={<Teste />} />
          <Route path="/storePurchasePage" element={<StorePurchasePage />} />
          <Route
            path="/interests"
            element={
              <InterestsFilterProvider>
                <InterestsPage />
              </InterestsFilterProvider>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}