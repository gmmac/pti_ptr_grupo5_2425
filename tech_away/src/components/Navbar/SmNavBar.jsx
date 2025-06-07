import React from "react";
import { Container, Navbar } from "react-bootstrap";
import "../../styles/variables.css";

const SmNavBar = () => {
	return (
		<Navbar
			style={{
				backgroundColor: "var(--light-grey)",
				boxShadow: "var(--shadow-default)",
			}}
		>
			<Container>
				<Navbar.Brand
					style={{
						color: "var(--dark-grey)",
						fontFamily: "var(--title-font)",
						fontWeight: "bold",
					}}
					className="fs-3"
				>
					TechAway
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default SmNavBar;
