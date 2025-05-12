import React from "react";
import { Navbar, Nav, Stack, Dropdown } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthenticationProviders/AuthProvider";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Badge } from "primereact/badge";
import { useCart } from "../../contexts/CartProvider";

const baseNavItems = [
	{
		name: "Home",
		path: "/",
		icon: "pi pi-home",
	},
	{
		name: "Shop",
		path: "/store",
		icon: "pi pi-shopping-bag",
	},
];

export default function BottomNavBar() {
	const { user, logOut } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const isCartActive = location.pathname === "/cart";
	const { numCartItems } = useCart();

	const handleLogout = () => {
		logOut();
		navigate("/login");
	};

	const handleProfile = () => {
		navigate("/profile");
	};

	const navItemsToShow = [...baseNavItems];

	return (
		<Navbar
			fixed="bottom"
			className="m-3 d-flex justify-content-center align-items-center"
		>
			<Nav
				className="p-1 rounded-pill justify-content-center align-items-center"
				style={{
					backgroundColor: "var(--white)",
					boxShadow: "var(--shadow-default)",
				}}
			>
				{navItemsToShow.map((item, index) => {
					const isActive = location.pathname === item.path;
					return (
						<Nav.Item key={index} className="mx-2">
							<Nav.Link
								as={Link}
								to={item.path}
								style={{
									backgroundColor: isActive
										? "var(--variant-one)"
										: "transparent",
								}}
								className="rounded-pill px-3"
							>
								<Stack
									direction="vertical"
									className="text-center align-items-center justify-content-center"
								>
									<i
										className={item.icon}
										style={{
											fontSize: "1.3rem",
											color: "var(--dark-grey)",
										}}
									></i>
									<p
										className="m-0"
										style={{
											fontSize: "9px",
											color: "var(--dark-grey)",
										}}
									>
										{item.name}
									</p>
								</Stack>
							</Nav.Link>
						</Nav.Item>
					);
				})}
				<Nav.Item className="mx-2">
					<Dropdown drop="up-centered">
						<Dropdown.Toggle
							id="dropdown-user"
							className="rounded-pill px-3 border-0"
							style={{ backgroundColor: "transparent" }}
						>
							<Stack
								direction="vertical"
								className="text-center align-items-center justify-content-center"
							>
								<i
									className="pi pi-info-circle"
									style={{ fontSize: "1.3rem", color: "var(--dark-grey)" }}
								></i>
								<p
									className="m-0"
									style={{ fontSize: "9px", color: "var(--dark-grey)" }}
								>
									Information
								</p>
							</Stack>
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item as={Link} to={"/our-stores"}>
								<Stack
									gap={2}
									direction="horizontal"
									className="text-center align-items-center justify-content-start"
								>
									<i
										className="pi pi-map-marker"
										style={{ fontSize: "1.3rem", color: "var(--dark-grey)" }}
									></i>
									<p className="m-0" style={{ color: "var(--dark-grey)" }}>
										Our Stores
									</p>
								</Stack>
							</Dropdown.Item>
							<Dropdown.Item as={Link} to={"/about-us"}>
								<Stack
									gap={2}
									direction="horizontal"
									className="text-center align-items-center justify-content-start"
								>
									<i
										className="pi pi-users"
										style={{ fontSize: "1.3rem", color: "var(--dark-grey)" }}
									></i>
									<p className="m-0" style={{ color: "var(--dark-grey)" }}>
										About Us
									</p>
								</Stack>
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Nav.Item>

				{user ? (
					<>
						<Nav.Item className="mx-2">
							<Nav.Link
								as={Link}
								to={"/cart"}
								style={{
									backgroundColor: isCartActive
										? "var(--variant-one)"
										: "transparent",
								}}
								className="rounded-pill px-3"
							>
								<Stack
									direction="vertical"
									className="text-center align-items-center justify-content-center"
								>
									<i
										className="pi pi-shopping-cart p-overlay-badge"
										style={{
											fontSize: "1.3rem",
											color: "var(--dark-grey)",
										}}
									>
										{numCartItems ? (
											<Badge
												value={numCartItems}
												style={{
													fontSize: "8px",
													backgroundColor: "var(--white)",
													color: "var(--dark-grey)",
												}}
											/>
										) : null}
									</i>
									<p
										className="m-0"
										style={{
											fontSize: "9px",
											color: "var(--dark-grey)",
										}}
									>
										Cart
									</p>
								</Stack>
							</Nav.Link>
						</Nav.Item>
						<Nav.Item className="mx-2">
							<Dropdown drop="up-centered">
								<Dropdown.Toggle
									id="dropdown-user"
									className="rounded-pill px-3 border-0"
									style={{ backgroundColor: "transparent" }}
								>
									<Stack
										direction="vertical"
										className="text-center align-items-center justify-content-center"
									>
										<i
											className="pi pi-user"
											style={{ fontSize: "1.3rem", color: "var(--dark-grey)" }}
										></i>
										<p
											className="m-0"
											style={{ fontSize: "9px", color: "var(--dark-grey)" }}
										>
											{user.firstName}
										</p>
									</Stack>
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item onClick={handleProfile}>Perfil</Dropdown.Item>
									<Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Nav.Item>
					</>
				) : (
					<Nav.Item className="mx-2">
						<Nav.Link
							as={Link}
							to="/login"
							className="rounded-pill px-3"
							style={{ backgroundColor: "transparent" }}
						>
							<Stack
								direction="vertical"
								className="text-center align-items-center justify-content-center"
							>
								<i
									className="pi pi-sign-in"
									style={{ fontSize: "1.3rem", color: "var(--dark-grey)" }}
								></i>
								<p
									className="m-0"
									style={{ fontSize: "9px", color: "var(--dark-grey)" }}
								>
									Login
								</p>
							</Stack>
						</Nav.Link>
					</Nav.Item>
				)}
			</Nav>
		</Navbar>
	);
}
