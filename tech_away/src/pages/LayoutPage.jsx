import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SmNavBar from "../components/Navbar/SmNavBar";
import InitialNavBar from "../components/Navbar/InitialNavBar";
import { Stack } from "react-bootstrap";
import { IsMobileContext } from "../contexts/IsMobileContext";
import BottomNavBar from "../components/Navbar/BottomNavBar";
import LoggedInNavBar from "../components/Navbar/LoggedInNavBar";

function LayoutPage({isUserLoggedIn, handle}) {
	const isMobile = useContext(IsMobileContext);

	useEffect(()=>{
		console.log("Logado" + isUserLoggedIn)
	},[isUserLoggedIn])

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
						<SmNavBar />
						<BottomNavBar />
					</>
				) : isUserLoggedIn ? (
					<LoggedInNavBar handle={handle}/>
				) : (
					<InitialNavBar handleLogout={handle}/>
				)}
			</div>

			<div>
				<Outlet />
			</div>
		</Stack>
	);
}

export default LayoutPage;