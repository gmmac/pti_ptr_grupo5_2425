import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AutenticationPage from "./pages/AutenticationPage";
import InterestsPage from "./pages/InterestsPage";

export default function Router() {
	return (
		<BrowserRouter>
			
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<AutenticationPage />} />
                <Route path="/interests" element={<InterestsPage />} />
            </Routes>

		</BrowserRouter>
	);
}
