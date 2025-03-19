import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InterestsPage from "./pages/InterestsPage";
import Teste from "./pages/Teste";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import { InterestsFilterProvider } from "./contexts/InterestsFilterProvider";
import StorePurchasePage from "./pages/StorePurchasePage";
import LayoutPage from "./pages/LayoutPage"; // Importe o Layout
import RegisterFormsEmployee from "./components/authentication/RegisterFormsEmployee";
import StorePage from "./pages/StorePage";
import EquipmentSheetPage from "./pages/EquipmentSheetPage";
import UsedEquipmentPage from "./pages/UsedEquipmentPage";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LayoutPage />}>
					<Route index element={<HomePage />} />

					<Route path="/auth" element={<AuthPage />} />
					<Route path="/auth/employee" element={<RegisterFormsEmployee />} />

					<Route path="/teste" element={<Teste />} />
					<Route path="/storePurchasePage" element={<StorePurchasePage />} />

					<Route path="/store" element={<StorePage />} />
					<Route path="/store/:equipmentSheetName" element={<EquipmentSheetPage />} />
					<Route path="/store/:equipmentSheetName/:usedEquipmentID" element={<UsedEquipmentPage />} />

					<Route
						path="/interests"
						element={
							<InterestsFilterProvider>
								<InterestsPage />
							</InterestsFilterProvider>
						}
					/>
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
}
