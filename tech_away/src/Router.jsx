import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AutenticationPage from "./pages/AutenticationPage";
import InterestsPage from "./pages/InterestsPage";
import StorePurchasePage from "./pages/StorePurchasePage";
import Teste from "./pages/Teste";
import { InterestsFilterProvider } from "./contexts/InterestsFilterProvider";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/register" element={<AutenticationPage />} />
        <Route path="/storePurchasePage" element={<StorePurchasePage />} />
				<Route
					path="/interests"
					element={
						<InterestsFilterProvider> {/* Fazer o filtro */}
							<InterestsPage />
						</InterestsFilterProvider>
					}
				/>
				<Route path="/teste" element={<Teste />} />
			</Routes>
		</BrowserRouter>
	);
}
