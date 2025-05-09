import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import SmNavBar from "../../components/Navbar/SmNavBar";
import InitialNavBar from "../../components/Navbar/InitialNavBar";
import { Stack } from "react-bootstrap";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import BottomNavBar from "../../components/Navbar/BottomNavBar";
import LoggedInNavBar from "../../components/Navbar/LoggedInNavBar";
import { useAuth } from "../../contexts/AuthenticationProviders/AuthProvider";
import { CartProvider } from "../../contexts/CartProvider";
function LayoutPage() {
	const isMobile = useContext(IsMobileContext);
	const { user, isUserLoggedIn } = useAuth();

	const renderNavBar = () => {
		if (isUserLoggedIn()) {
			return isMobile ? (
				<>
					<SmNavBar />
					<BottomNavBar />
				</>
			) : (
				<LoggedInNavBar />
			);
		} else {
			return isMobile ? (
				<>
					<SmNavBar />
					<BottomNavBar />
				</>
			) : (
				<InitialNavBar />
			);
		}
	};

	return (
		<Stack
			className="vh-100 m-0 p-0"
			style={{ backgroundColor: "var(--light-grey)" }}
		>
			<CartProvider>
				{renderNavBar()}
				<div className="flex-grow-1 overflow-auto">
					<Outlet />
				</div>
			</CartProvider>
		</Stack>
	);
}

export default LayoutPage;
