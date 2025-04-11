import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Image, Stack } from "react-bootstrap";
import { Tag } from "primereact/tag";
import api from "../../utils/axios";

export default function EquipmentSheetCard(eSheet) {
	const [priceRange, setPriceRange] = useState("");
	const navigate = useNavigate();

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

	return (
		<Stack
			direction="vertical"
			style={{
				fontFamily: "var(--body-font)",
				color: "var(--dark-grey)",
				backgroundColor: "var(--white)",
				boxShadow: "var(--shadow-default)",
			}}
			gap={2}
			className="rounded-sm p-4 justify-content-center align-items-center"
			onClick={() =>
				navigate(`/store/${slug}`, { state: { barcode: equipmentBarcode } })
			}
		>
			<Stack direction="horizontal" gap={2} className="justify-content-between">
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
				src="../../public/assets/pc.jpg"
				className="w-50"
				style={{
					mixBlendMode: "darken",
				}}
			/>
			<h5
				style={{ color: "var(--variant-two)", fontFamily: "var(--title-font)" }}
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
				>
					<i className="pi pi-heart" style={{ color: "var(--white)" }}></i>
				</Button>
			</Stack>
		</Stack>
	);
}
