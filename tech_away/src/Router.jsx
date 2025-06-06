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
import EmployeeHomePage from "./pages/Employee/EmployeeHomePage";

import InterestsPage from "./pages/InterestsPage";
import { InterestsFilterProvider } from "./contexts/InterestsFilterProvider";
import StorePage from "./pages/StorePage";
import EquipmentSheetPage from "./pages/EquipmentSheetPage";
import UsedEquipmentPage from "./pages/UsedEquipmentPage";

import { IsMobileProvider } from "./contexts/IsMobileContext";

import AuthProvider from "./contexts/AuthenticationProviders/AuthProvider";
import EmployeeAuthProvider from "./contexts/AuthenticationProviders/EmployeeAuthProvider";
import ProfilePageClient from "./pages/Auth/ProfilePageClient";
import EmployeeLayoutPage from "./pages/Layout/EmployeeLayoutPage";
import EmployeeManagePage from "./pages/Employee/EmployeeManagePage";
import OrganizerRegisterPage from "./pages/Organizer/OrganizerRegisterPage";
import OrganizerLoginPage from "./pages/Organizer/OrganizerLoginPage";
import OrganizerLayoutPage from "./pages/Layout/OrganizerLayoutPage";
import OrganizerHomePage from "./pages/Organizer/OrganizerHomePage";
import CheckoutOrderPage from "./pages/CheckoutOrderPage";
import PaymentForm from "./components/payment/PaymentForm";
import Payment from "./components/payment/Payment";
import ConfirmedPayment from "./components/payment/ConfirmedPayment";
import OrganizerAuthProvider from "./contexts/AuthenticationProviders/OrganizerAuthProvider";
import { UserTypeProvider } from "./contexts/AuthenticationProviders/UserTypeProvider";
import CharityProjectPage from "./pages/Organizer/CharityProjectPage";
import TestPage from "./pages/TestPage";
import CartMobilePage from "./pages/CartMobilePage";
import AboutPage from "./pages/AboutPage";
import OurStores from "./pages/OurStores";

export default function Router() {
	return (
		<IsMobileProvider>
			<UserTypeProvider>
				<BrowserRouter>
					<Routes>
						<Route path="*" element={<NotFoundPage />} />
						<Route path="teste" element={<TestPage />} />

						{/* Rotas do Client */}
						<Route
							path="/"
							element={
								<AuthProvider userType="client">
									<LayoutPage />
								</AuthProvider>
							}
						>
							<Route path="about-us" element={<AboutPage />} />
							<Route path="our-stores" element={<OurStores />} />

							<Route index element={<HomePage />} />
							<Route path="store" element={<StorePage />} />
							<Route
								path="store/:equipmentSheetName"
								element={<EquipmentSheetPage />}
							/>
							<Route
								path="store/:equipmentSheetName/:usedEquipmentID"
								element={<UsedEquipmentPage />}
							/>
							<Route path="changePassword" element={<ChangePasswordClient />} />
							<Route path="register" element={<RegisterPageClient />} />
							<Route path="login" element={<LoginPageClient />} />
							<Route path="profile" element={<ProfilePageClient />} />
							<Route path="cart" element={<CartMobilePage />} />
							<Route
								path="interests"
								element={
									<InterestsFilterProvider>
										<InterestsPage />
									</InterestsFilterProvider>
								}
							/>
							<Route path="checkout-order" element={<CheckoutOrderPage />} />
							<Route path="payment" element={<Payment />} />
							<Route path="payment/confirmed" element={<ConfirmedPayment />} />
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
							<Route element={<EmployeeLayoutPage />}>
								<Route index element={<EmployeeHomePage />} />
								<Route path="manage" element={<EmployeeManagePage />} />
							</Route>

							<Route path="login" element={<EmployeeLoginPage />} />
							<Route path="register" element={<EmployeeRegisterPage />} />
						</Route>

						{/* Rotas do organizador */}
						<Route
							path="/organizer"
							element={
								<OrganizerAuthProvider>
									<Outlet />
								</OrganizerAuthProvider>
							}
						>
							<Route element={<OrganizerLayoutPage />}>
								<Route index element={<OrganizerHomePage />} />
								{/* <Route path="manage" element={<EmployeeManagePage />} /> */}
							</Route>

							<Route path="projects/:id" element={<CharityProjectPage />} />
							<Route path="login" element={<OrganizerLoginPage />} />
							<Route path="register" element={<OrganizerRegisterPage />} />
							<Route
								path="changePassword"
								element={<ChangePasswordClient userType="organizer" />}
							/>
						</Route>
					</Routes>
				</BrowserRouter>
			</UserTypeProvider>
		</IsMobileProvider>
	);
}
