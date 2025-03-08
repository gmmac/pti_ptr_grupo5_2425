import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AutenticationPage from "./pages/AutenticationPage";
import Teste from "./pages/Teste";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";

export default function Router() {
	return (
		<BrowserRouter>
			
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AutenticationPage />} />
                <Route path="/teste" element={<Teste />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LoginPage />} />

            </Routes>



		</BrowserRouter>
	);
}
