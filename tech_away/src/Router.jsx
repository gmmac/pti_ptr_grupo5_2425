import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AutenticationPage from "./pages/AutenticationPage";

export default function Router() {
	return (
		<BrowserRouter>
			
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<AutenticationPage />} />

            </Routes>



		</BrowserRouter>
	);
}
