import React, { useState, useEffect } from "react";
import {
	Container,
	Navbar,
	Nav,
	NavDropdown,
	Stack,
	Button,
} from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthenticationProviders/AuthProvider";
import { useCart } from "../../contexts/CartProvider";
import { Badge } from "primereact/badge";
import "../../styles/variables.css";

const navItems = [
	{ name: "About Us", path: "/about" },
	{ name: "Our Services", path: "/services" },
	{ name: "Store", path: "/store" },
];

export default function LoggedInNavBar() {
	const location = useLocation();
	const navigate = useNavigate();

	const { user, logOut } = useAuth();
	const { numCartItems, openCart } = useCart();

	// Função para logout
	const handleLogout = () => {
		if (user) {
			logOut();
		}

		navigate("/login");
	};

	const handleProfile = () => {
		navigate("/profile");
	};

	return (
		<>
			<Navbar
				style={{
					backgroundColor: "var(--light-grey)",
				}}
			>
				<Container>
					<Navbar.Brand
						as={Link}
						to={"/"}
						style={{
							color: "var(--dark-grey)",
							fontFamily: "var(--title-font)",
							fontWeight: "bold",
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
										className="py-1 px-3 my-1 rounded-pill"
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

					{/* Dropdown com nome do utilizador e logout */}
					<Nav>
						<Stack
							direction="horizontal"
							gap={2}
							className="align-items-center"
						>
							<Nav.Item>
								<Button
									className="rounded-pill"
									style={{
										backgroundColor: "var(--variant-two)",
										border: "none",
									}}
									onClick={openCart}
								>
									<i
										className="pi pi-shopping-cart p-overlay-badge px-2"
										style={{ color: "var(--dark-grey)", fontSize: "20px" }}
									>
										<Badge
											value={numCartItems}
											style={{
												fontSize: "10px",
												backgroundColor: "var(--white)",
												color: "var(--dark-grey)",
											}}
										/>
									</i>
								</Button>
							</Nav.Item>
							<NavDropdown
								title={
									<span style={{ marginRight: "20px" }}>{user.firstName}</span>
								}
								className="rounded-pill px-3 fs-6"
								style={{
									backgroundColor: "var(--variant-two)",
									fontWeight: "bold",
								}}
							>
								<NavDropdown.Item onClick={handleProfile}>
									Perfil
								</NavDropdown.Item>
								<NavDropdown.Item onClick={handleLogout}>
									Logout
								</NavDropdown.Item>
							</NavDropdown>
						</Stack>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}
