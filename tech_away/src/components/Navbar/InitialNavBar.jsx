import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/variables.css";

const navItems = [
	{ name: "Shop", path: "/store" },
	{ name: "About Us", path: "/about-us" },
	{ name: "Our Stores", path: "/our-stores" },
];

export default function InitialNavBar() {
	const location = useLocation();
	const [isRegisterPage, setIsRegisterPage] = useState(false);
	const navigate = useNavigate();

	// Verifica a URL e define o estado isRegisterPage
	useEffect(() => {
		if (location.pathname === "/register") {
			setIsRegisterPage(true);
		} else if (location.pathname === "/login") {
			setIsRegisterPage(false);
		}
	}, [location]);

	// Função para redirecionar para a página de login ou registro
	const handleNavigation = (formType) => {
		setIsRegisterPage(formType === "register");
		navigate("/" + formType);
	};

	return (
		<Navbar
			style={{
				backgroundColor: "var(--light-grey)",
			}}
		>
			<Container>
				<Navbar.Brand
					onClick={() => navigate("/")}
					style={{
						color: "var(--dark-grey)",
						fontFamily: "var(--title-font)",
						fontWeight: "bold",
						cursor: "pointer",
					}}
					className="fs-3"
				>
					TechAway
				</Navbar.Brand>

				{/* Navegação principal */}
				<Nav
					style={{
						backgroundColor: "var(--white)",
						boxShadow: "var(--shadow-default)",
					}}
					className="rounded-pill px-2"
				>
					{navItems.map((item, index) => {
						const isActive = location.pathname === item.path;
						return (
							<Nav.Item
								key={index}
								style={{
									fontFamily: "var(--body-font)",
									color: "var(--dark-grey)",
									fontWeight: "bold",
								}}
								className="px-2 py-0 mx-2 fs-6"
							>
								<Nav.Link
									as={Link}
									to={item.path}
									className="py-1 px-3 my-1  rounded-pill"
									style={{
										backgroundColor: isActive
											? "var(--variant-one)"
											: "transparent",
									}}
								>
									{item.name}
								</Nav.Link>
							</Nav.Item>
						);
					})}
				</Nav>

				{/* Botões Register & Login */}
				<Nav
					style={{
						backgroundColor: "var(--variant-two)",
						boxShadow: "var(--shadow-default)",
						fontWeight: "bold",
					}}
					className="rounded-pill"
				>
					<Nav.Item
						style={
							isRegisterPage
								? {
										backgroundColor: "var(--dark-grey)",

										color: "var(--white)",
								  }
								: null
						}
						className="px-4 rounded-pill fs-6"
					>
						<Nav.Link
							onClick={() => handleNavigation("register")}
							style={{
								color: isRegisterPage ? "var(--white)" : "inherit",
							}}
						>
							Register
						</Nav.Link>
					</Nav.Item>
					<Nav.Item
						style={
							isRegisterPage
								? null
								: {
										backgroundColor: "var(--dark-grey)",
										color: "var(--white)",
								  }
						}
						className="px-4 rounded-pill fs-6"
					>
						<Nav.Link
							onClick={() => handleNavigation("login")}
							style={{ color: isRegisterPage ? "inherit" : "var(--white)" }}
						>
							Log in
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Container>
		</Navbar>
	);
}
