import React, { useEffect, useState } from "react";
import { Container, Image, Stack } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthenticationProviders/AuthProvider";
import api from "../utils/axios";
import EquipmentSheetInfo from "../components/EquipmentSheetPage/EquipmentSheetInfo";
import UsedEquipmentCard from "../components/EquipmentSheetPage/UsedEquipmentCard";

export default function EquipmentSheetPage() {
	const location = useLocation();
	const barcode = location.state?.barcode;

	const [equipmentSheet, setEquipmentSheet] = useState({});
	const [refresh, setRefresh] = useState(false);

	// vai ser usado para obter o id do carrinho
	const { user, logOut } = useAuth();
	const [cartId, setCartId] = useState(null);

	const [usedEquipmentList, setUsedEquipmentList] = useState({});

	const handleRefresh = () => {
		setRefresh(!refresh);
	};

	useEffect(() => {
		api
			.get(`api/equipmentSheet/${barcode}`)
			.then((res) => {
				setEquipmentSheet(res.data.equipmentSheet);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, [refresh]);

	useEffect(() => {
		api
			.get(`api/usedEquipment/${barcode}`)
			.then((res) => {
				setUsedEquipmentList(res.data.usedEquipments);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, [refresh]);

	useEffect(() => {
		if (user) {
			api
				.get(`/api/actualCart/clientCartID/${user.nic}`)
				.then((res) => {
					setCartId(res.data);
				})
				.catch((error) => {
					console.error("Erro ao buscar ID do carrinho:", error);
				});
		}
	}, [user]);

	return (
		<Container>
			<Stack direction="vertical" gap={3}>
				<Stack direction="horizontal" gap={3}>
					<EquipmentSheetInfo equipmentInfo={equipmentSheet} />

					{/* Esta imagem é para ser substituida pelo mapa interarivo */}
					<Image
						src="../../public/assets/mapa.png"
						style={{ boxShadow: "var(--shadow-default)" }}
						className="rounded-sm"
					/>
				</Stack>
				<Stack direction="horizontal" gap={3} className="">
					{usedEquipmentList.length > 0 ? (
						usedEquipmentList.map((usedEquipment, index) => (
							<UsedEquipmentCard
								key={index}
								usedEquipment={usedEquipment}
								cartId={cartId}
							/>
						))
					) : (
						<p>Nenhum equipamento usado encontrado.</p>
					)}
				</Stack>
			</Stack>
		</Container>
	);
}
