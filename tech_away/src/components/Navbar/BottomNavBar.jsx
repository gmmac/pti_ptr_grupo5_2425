import React from "react";
import { Navbar, Nav, Stack } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthenticationProviders/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";

const baseNavItems = [
	{
		name: "Home",
		path: "/",
		icon: "pi pi-home",
	},
	{
		name: "Store",
		path: "/store",
		icon: "pi pi-shopping-bag",
	},
	{
		name: "Our Stores",
		path: "/our-stores",
		icon: "pi pi-map-marker",
	},
];

export default function BottomNavBar() {
	const { user, logOut } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		if (user) {
			logOut();
		}
		navigate("/login");
	};

	const authNavItem = user
		? {
				name: user.firstName,
				path: "/profile",
				icon: "pi pi-user",
		  }
		: {
				name: "Login",
				path: "/login",
				icon: "pi pi-sign-in",
		  };

	const navItemsToShow = [...baseNavItems, authNavItem];

	return (
		<Navbar
			fixed="bottom"
			className=" m-3 d-flex justify-content-center align-items-center"
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
								className={user ? "rounded-pill px-2" : "rounded-pill px-3"}
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
				{user && (
					<Nav.Item className="mx-2">
						<Nav.Link
							onClick={handleLogout}
							style={{
								backgroundColor: "transparent",
								cursor: "pointer",
							}}
							className="px-2 rounded-pill"
						>
							<Stack
								direction="vertical"
								className="text-center align-items-center justify-content-center"
							>
								<i
									className="pi pi-sign-out"
									style={{ fontSize: "1.3rem", color: "var(--dark-grey)" }}
								></i>
								<p className="m-0" style={{ fontSize: "9px" }}>
									Logout
								</p>
							</Stack>
						</Nav.Link>
					</Nav.Item>
				)}
			</Nav>
		</Navbar>
	);
}
