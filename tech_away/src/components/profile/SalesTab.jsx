import { useState, useEffect } from "react";
import { Modal, Button, Stack, Form } from "react-bootstrap";
import api from "../../utils/axios";
import { useAuth } from "../../contexts/AuthenticationProviders/AuthProvider";

export default function SalesTab() {
	const { user } = useAuth();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedPurchase, setSelectedPurchase] = useState(null);
	const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
	const [filterDate, setFilterDate] = useState("");

	useEffect(() => {
		loadData();
	}, [filterDate]);

	const loadData = () => {
		setLoading(true);
		const params = { nic: user?.nic };
		if (filterDate) {
			params.createdAt = filterDate;
		}
		api
			.get("/api/storePurchase", { params })
			.then((res) => {
				setData(res.data.data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Erro ao carregar dados:", err);
				setLoading(false);
			});
	};

	const openDetails = (purchase) => {
		setSelectedPurchase(purchase);
		setShowPurchaseDialog(true);
	};

	return (
		<Stack direction="vertical" gap={3} className="px-4">
			<h5 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
				My Sales
			</h5>
			<div>
				<Form.Group className="mb-4 " controlId="filterDate">
					<Form.Label style={{ color: "var(--variant-two-dark" }}>
						Filter by date
					</Form.Label>
					<Stack
						style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
						direction="horizontal"
					>
						<Form.Control
							className="rounded-pill"
							type="date"
							value={filterDate}
							onChange={(e) => setFilterDate(e.target.value)}
						/>
						<Button
							variant="secondary"
							className="rounded-pill w-25"
							onClick={() => setFilterDate("")}
							disabled={!filterDate}
						>
							Clear
						</Button>
					</Stack>
				</Form.Group>

				{data.length === 0 && !loading && (
					<p className="text-center">No sales found.</p>
				)}

				<Stack
					direction="vertical"
					className="pe-2"
					gap={2}
					style={{ overflowY: "auto", maxHeight: "350px" }}
				>
					{data.map((purchase) => (
						<Stack
							key={purchase.id}
							direction="vertical"
							gap={2}
							style={{
								backgroundColor: "#eae6f0",
								padding: "20px",
								borderRadius: "16px",
								maxHeight: "130px",
							}}
							className="p-4"
						>
							<Stack
								direction="horizontal"
								gap={2}
								className="justify-content-between align-items-center"
								style={{
									color: "var(--dark-grey)",
									fontFamily: "var(--body-font)",
								}}
							>
								<Stack direction="vertical" gap={2}>
									<h6
										className="m-0"
										style={{ fontFamily: "var(--title-font)" }}
									>
										Order ID: {purchase.id}
									</h6>
									<p className="m-0" style={{ opacity: "0.7" }}>
										{new Date(purchase.createdAt).toLocaleDateString("pt-PT")}
									</p>
									<Button
										onClick={() => openDetails(purchase)}
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
										<span
											className="ms-2"
											style={{ color: "var(--dark-grey)" }}
										>
											View details
										</span>
									</Button>
								</Stack>
								<Stack direction="vertical" gap={2} className="text-end">
									<h6 className="m-0">
										{parseFloat(purchase.purchasePrice).toFixed(2)} €
									</h6>
								</Stack>
							</Stack>
						</Stack>
					))}
				</Stack>
			</div>

			{/* Modal com detalhes */}
			<Modal
				show={showPurchaseDialog}
				onHide={() => setShowPurchaseDialog(false)}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Purchase Details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{selectedPurchase && (
						<Stack gap={2}>
							<p>
								<strong>ID:</strong> {selectedPurchase.id}
							</p>
							<p>
								<strong>Employee:</strong> {selectedPurchase.employeeName}
							</p>
							<p>
								<strong>Model:</strong> {selectedPurchase.modelName}
							</p>
							<p>
								<strong>Store:</strong> {selectedPurchase.storeName}
							</p>
							<p>
								<strong>Price:</strong> {selectedPurchase.purchasePrice} €
							</p>
							<p>
								<strong>Date:</strong>{" "}
								{new Date(selectedPurchase.createdAt).toLocaleDateString(
									"pt-PT"
								) +
									" " +
									new Date(selectedPurchase.createdAt).toLocaleTimeString(
										"pt-PT",
										{
											hour: "2-digit",
											minute: "2-digit",
											hour12: false,
										}
									)}
							</p>
						</Stack>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => setShowPurchaseDialog(false)}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</Stack>
	);
}
