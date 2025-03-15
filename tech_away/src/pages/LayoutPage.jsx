import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import SmNavbar from "../components/Navbar/SmNavbar";
import InitialNavBar from "../components/Navbar/InitialNavBar";
import { Stack } from "react-bootstrap";
import { IsMobileContext } from "../contexts/IsMobileContext";
import BottomNavBar from "../components/Navbar/BottomNavBar";

function LayoutPage() {
	const isMobile = useContext(IsMobileContext);

	return (
		<Stack className="dvh-100">
			<div
				style={{
					backgroundColor: "var(--light-grey)",
					color: "var(--dark-grey)",
				}}
			>
				{isMobile ? (
					<>
						<SmNavbar />
						<BottomNavBar />
					</>
				) : (
					<InitialNavBar />
				)}
			</div>

			<div>
				<Outlet />
			</div>
		</Stack>
	);
}

export default LayoutPage;