import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Image, Stack, Modal } from "react-bootstrap";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import api from "../../utils/axios";
import { useInterests } from "../../contexts/InterestsProvider";
import { useAuth } from "../../contexts/AuthenticationProviders/AuthProvider";

export default function EquipmentSheetCard(eSheet) {
	const [priceRange, setPriceRange] = useState("");
	const navigate = useNavigate();
	const { createFavoriteInteres } = useInterests();
	const { user } = useAuth();
	const [showLoginModal, setShowLoginModal] = useState(false);
	const toast = useRef(null);

	const handleCloseModal = () => setShowLoginModal(false);
	const handleGoToLogin = () => navigate("/login");

	useEffect(() => {
		api
			.get("/api/usedEquipment/price-range/" + eSheet?.eSheet?.Barcode)
			.then((res) => {
				if ("price" in res.data) {
					setPriceRange(res.data.price + " €");
				} else if ("minPrice" in res.data && "maxPrice" in res.data) {
					setPriceRange(res.data.minPrice + " - " + res.data.maxPrice + " €");
				}
			})
			.catch((error) => {
				console.error("Erro ao buscar faixa de preços:", error);
			});
	}, [eSheet]);

	const createSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

	const equipmentName = eSheet?.eSheet?.EquipmentModel || "produto";
	const equipmentBarcode = eSheet?.eSheet?.Barcode;
	const slug = createSlug(equipmentName);

	const handleAddFavs = () => {
		if (!user) {
			setShowLoginModal(true);
			return;
		}
		createFavoriteInteres(eSheet?.eSheet?.Barcode);

		toast.current?.show({
			severity: "success",
			summary: "Interesse adicionado",
			detail: "O produto foi adicionado aos teus favoritos.",
			life: 3000,
		});
	};

	return (
		<>
			<Stack
				direction="vertical"
				style={{
					fontFamily: "var(--body-font)",
					color: "var(--dark-grey)",
					backgroundColor: "var(--white)",
					boxShadow: "var(--shadow-default)",
					height: "290px",
				}}
				gap={2}
				className="rounded-sm p-4 justify-content-between align-items-center"
				onClick={() =>
					navigate(`/store/${slug}`, { state: { barcode: equipmentBarcode } })
				}
			>
				<Stack
					direction="horizontal"
					gap={2}
					className="justify-content-between"
				>
					<Stack
						direction="horizontal"
						className="justify-content-center align-items-center"
						gap={2}
					>
						<i className="pi pi-tag" style={{ color: "var(--dark-grey)" }}></i>
						<p className="m-0">{eSheet?.eSheet?.EquipmentType}</p>
					</Stack>
					<Tag
						value={eSheet?.eSheet?.Brand}
						rounded
						style={{
							backgroundColor: "var(--variant-one)",
							fontFamily: "var(--body-font)",
						}}
					/>
				</Stack>
				<Image
					src={`../../public/assets/equipmentSheetImages/${eSheet?.eSheet?.Barcode}.jpg`}
					onError={(e) => {
						e.target.onerror = null;
						e.target.src = "/assets/placeholder.jpg";
					}}
					style={{
						mixBlendMode: "darken",
						height: "129px",
					}}
				/>
				<h5
					style={{
						color: "var(--variant-two)",
						fontFamily: "var(--title-font)",
					}}
					className="m-0 text-bold"
				>
					{equipmentName}
				</h5>
				<Stack
					direction="horizontal"
					className="justify-content-between align-items-center"
				>
					<p className=" m-0">{priceRange}</p>
					<Button
						className="rounded-circle"
						style={{ backgroundColor: "var(--variant-two)", border: "none" }}
						onClick={(event) => {
							event.stopPropagation();
							handleAddFavs();
						}}
					>
						<i className="pi pi-heart" style={{ color: "var(--white)" }}></i>
					</Button>
				</Stack>
			</Stack>
			<Modal show={showLoginModal} onHide={handleCloseModal} centered>
				<Modal.Header closeButton>
					<Modal.Title>Login Required</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					You need to log in to add items to your interests.
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={handleCloseModal}
						className="rounded-pill"
					>
						Cancel
					</Button>
					<Button
						onClick={handleGoToLogin}
						className="rounded-pill"
						style={{
							backgroundColor: "var(--variant-two)",
							border: "none",
						}}
					>
						Go to Login
					</Button>
				</Modal.Footer>
			</Modal>
			<Toast ref={toast} />
		</>
	);
}
