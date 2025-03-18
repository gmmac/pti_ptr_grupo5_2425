import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Stack } from "react-bootstrap";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import SmNavbar from "../../components/Navbar/SmNavBar";

function LayoutPage({ isUserLoggedIn, handle }) {
	const isMobile = useContext(IsMobileContext);

	useEffect(() => {
		console.log("Usuário logado:", isMobile);
	}, [isMobile]);


	return (
		<Stack className="dvh-100">
			<div
				style={{
					backgroundColor: "var(--light-grey)",
					color: "var(--dark-grey)",
				}}
			>
			</div>
            <SmNavbar />

			<div>
				<Outlet />
			</div>
		</Stack>
	);
}

export default LayoutPage;
