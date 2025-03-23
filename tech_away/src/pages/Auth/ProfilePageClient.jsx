import React from "react";
import { Nav, Container } from "react-bootstrap";
import "../../styles/variables.css";
import ClientProfile from '../../components/client/ClientProfile';
import "../../styles/ClientProfilePage.css"

export default function ProfilePageClient() {
	return (
		<div className="d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 70px)" }}>
			<Container
				fluid
				className="d-flex p-0"
			>
				{/* Sidebar Navigation */}
				<Nav
				variant="pills"
				className="flex-column p-3 bg-white text-white d-flex align-items-center justify-content-center m-4 rounded-5 shadow-lg"
				style={{ width: "250px"}} // Ocupa altura total e centraliza
				>
				<Nav.Item className="mb-5 w-100 text-center bg-variant-two">
					<Nav.Link eventKey="profile" className="p-3 rounded fw-bold">
					Profile
					</Nav.Link>
				</Nav.Item>
				<Nav.Item className="mb-5 w-100 text-center bg-variant-two">
					<Nav.Link eventKey="sales" className="p-3 rounded fw-bold">
					Sales
					</Nav.Link>
				</Nav.Item>
				<Nav.Item className="mb-5 w-100 text-center bg-variant-two">
					<Nav.Link eventKey="purchases" className="p-3 rounded fw-bold">
					Purchases
					</Nav.Link>
				</Nav.Item>
				<Nav.Item className="w-100 text-center bg-variant-two">
					<Nav.Link eventKey="repairs" className="p-3 rounded fw-bold">
					Repairs
					</Nav.Link>
				</Nav.Item>
				</Nav>

				<ClientProfile />
			</Container>   
		</div>
	);
}
