import Reac, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import OrderDetailsModal from "./OrderDetailsModal";

export default function OrderCard({ order }) {
	const [showDetails, setShowDetails] = useState(false);

	const handleShowDetails = () => {
		setShowDetails(true);
	};
	const handleCloseDetails = () => {
		setShowDetails(false);
	};
	return (
		<>
			<Stack
				direction="vertical"
				gap={2}
				style={{
					backgroundColor: "#eae6f0",
					borderRadius: "10px",
					padding: "20px",
					borderRadius: "16px",
				}}
				className="p-4"
			>
				<Stack
					direction="horizontal"
					gap={2}
					className="justify-content-between align-items-center"
					style={{ color: "var(--dark-grey)", fontFamily: "var(--body-font)" }}
				>
					<Stack direction="vertical" gap={2}>
						<h6 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
							Order ID: {order.id}
						</h6>
						<p className="m-0" style={{ opacity: "0.7" }}>
							{new Date(order.createdAt).toLocaleDateString("pt-PT")}
						</p>
						<Button
							onClick={handleShowDetails}
							className="rounded-pill w-50 text-start p-0"
							style={{
								backgroundColor: "transparent",
								border: "none",
							}}
						>
							<i
								className="pi pi-eye"
								style={{ color: "var(--dark-grey)" }}
							></i>
							<span className="ms-2" style={{ color: "var(--dark-grey)" }}>
								View details
							</span>
						</Button>
					</Stack>
					<Stack direction="vertical" gap={2} className="text-end">
						<p className="m-0">{order.OrderStatus.state}</p>
						<h6 className="m-0">{order.total} €</h6>
					</Stack>
				</Stack>
			</Stack>
			<OrderDetailsModal
				showDetails={showDetails}
				setShowDetails={handleCloseDetails}
				order={order}
			/>
		</>
	);
}
