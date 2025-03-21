import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SmNavBar from "../../components/Navbar/SmNavBar";
import InitialNavBar from "../../components/Navbar/InitialNavBar";
import { Stack } from "react-bootstrap";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import BottomNavBar from "../../components/Navbar/BottomNavBar";
import LoggedInNavBar from "../../components/Navbar/LoggedInNavBar";

function LayoutPage({ isUserLoggedIn, handle }) {
	const isMobile = useContext(IsMobileContext);

	// Definição do Navbar com base no estado do usuário e do tamanho da tela
	const renderNavBar = () => {
		if (isUserLoggedIn) {
			return isMobile ? (
				<>
					<SmNavBar />
					<BottomNavBar />
				</>
			) : (
				<LoggedInNavBar handle={handle} />
			);
		} else {
			return isMobile ? (
				<>
					<SmNavBar />
					<BottomNavBar />
				</>
			) : (
				<InitialNavBar handleLogout={handle} />
			);
		}
	};

	return (
		<Stack className="dvh-100">
			<div
				style={{
					backgroundColor: "var(--light-grey)",
					color: "var(--dark-grey)",
				}}
			>
				{renderNavBar()}
			</div>

			<div 				
				style={{
					backgroundColor: "var(--light-grey)",
					color: "var(--dark-grey)",
				}}>
					
				<Outlet />
			</div>
		</Stack>
	);
}

export default LayoutPage;
