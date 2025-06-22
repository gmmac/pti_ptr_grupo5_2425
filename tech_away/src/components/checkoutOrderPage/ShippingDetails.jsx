import { useState } from "react";
import { Stack, Form, Button } from "react-bootstrap";
import SelectStoreModal from "./SelectStoreModal";

export default function ShippingDetails({
	shippingMethod,
	setShippingMethod,
	selectedStore,
	setSelectedStore,
	address,
	setAddress,
}) {
	const [showSelectStoreModal, setShowSelectStoreModal] = useState(false);

	return (
		<>
			<Stack
				className="p-4 flex-grow-1"
				style={{
					borderRadius: "var(--rounded-sm)",
					backgroundColor: "var(--white)",
					boxShadow: "var(--shadow-default)",
				}}
			>
				<Stack direction="horizontal" gap={2}>
					<h5
						className="rounded-circle d-flex align-items-center justify-content-center"
						style={{
							width: "35px",
							height: "35px",
							backgroundColor: "var(--variant-two)",
							color: "white",
						}}
					>
						2
					</h5>
					<h5>Shipping Details</h5>
				</Stack>
				<Form className="mt-3">
					<Form.Check
						type="radio"
						id="storePickup"
						label="Pickup in Store"
						name="shippingMethod"
						className="custom-radio"
						checked={shippingMethod === "store"}
						onChange={() => setShippingMethod("store")}
					/>
					{shippingMethod === "store" && (
						<Stack
							direction="vertical"
							className="p-3 my-2"
							gap={2}
							style={{
								backgroundColor: "var(--variant-one-light)",
								borderRadius: "16px",
							}}
						>
							<Stack
								direction="horizontal"
								gap={2}
								className=" justify-content-between align-items-center"
							>
								<p
									className="m-0 d-flex  gap-2 justify-content-center align-items-center"
									style={{ color: "var(--variant-one-dark)" }}
								>
									<i className="pi pi-shop"></i>
									<span>Store: {selectedStore ? selectedStore.name : "−"}</span>
								</p>
								<Stack direction="horizontal" gap={2}>
									<Button
										className="rounded-pill d-flex gap-2 justify-content-center align-items-center"
										style={{
											backgroundColor: "var(--variant-one-light)",
											color: "var(--variant-one-dark)",
											border: "1px solid var(--variant-one-dark)",
										}}
										onClick={() => setSelectedStore(null)}
										disabled={!selectedStore}
									>
										<i className="pi pi-times"></i>
										<span>Clear</span>
									</Button>
									<Button
										className="rounded-pill d-flex gap-2 justify-content-center align-items-center "
										style={{
											backgroundColor: "var(--variant-one)",
											color: "white",
											border: "none",
										}}
										onClick={() => setShowSelectStoreModal(true)}
									>
										<span>Select Store</span>
									</Button>
								</Stack>
							</Stack>
							<p
								className="m-0 d-flex align-items-center gap-2"
								style={{ color: "var(--variant-one-dark)" }}
							>
								<i className="pi pi-info-circle"></i>
								<span>No delivery fee</span>
							</p>
						</Stack>
					)}

					<Form.Check
						type="radio"
						id="homeDelivery"
						label="Home Delivery"
						name="shippingMethod"
						className="custom-radio"
						checked={shippingMethod === "home"}
						onChange={() => setShippingMethod("home")}
					/>
					{shippingMethod === "home" && (
						<Stack
							direction="vertical"
							className="p-3 my-2"
							gap={2}
							style={{
								backgroundColor: "var(--variant-one-light)",
								borderRadius: "16px",
							}}
						>
							<Form.Group
								className="d-flex align-items-center gap-2"
								controlId="formFileSm"
							>
								<Form.Label
									className="d-flex align-items-center gap-2 m-0"
									style={{ color: "var(--variant-one-dark)" }}
								>
									<i className="pi pi-home" />
									<span>Address</span>
								</Form.Label>

								<Form.Control
									size="sm"
									className="rounded-pill"
									type="text"
									placeholder="Number, Street"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</Form.Group>
							<p
								className="m-0 d-flex align-items-center gap-2"
								style={{ color: "var(--variant-one-dark)" }}
							>
								<i className="pi pi-info-circle"></i>
								<span>Delivery fee: 3,25€</span>
							</p>
						</Stack>
					)}
				</Form>
			</Stack>
			<SelectStoreModal
				showModal={showSelectStoreModal}
				setShowModal={setShowSelectStoreModal}
				selectedStore={selectedStore}
				setSelectedStore={setSelectedStore}
			/>
		</>
	);
}
