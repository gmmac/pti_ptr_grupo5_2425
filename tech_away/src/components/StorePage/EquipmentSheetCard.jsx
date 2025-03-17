import React, { useEffect, useState } from "react";
import { Image, Stack } from "react-bootstrap";
import Icon from "../svg/Icon";
import api from "../../utils/axios";

export default function EquipmentSheetCard(eSheet) {
	const [priceRange, setPriceRange] = useState("");

	useEffect(() => {
		api
			.get("/api/usedEquipment/price-range/" + eSheet?.eSheet?.barcode)
			.then((res) => {
				console.log(res.data);
				if ("price" in res.data) {
					// Se for um único preço, salva como número

					setPriceRange(res.data.price + " EUR");
				} else if ("minPrice" in res.data && "maxPrice" in res.data) {
					// Se for um objeto com minPrice e maxPrice, salva o objeto
					setPriceRange(res.data.minPrice + " - " + res.data.maxPrice + " EUR");
				}
			})
			.catch((error) => {
				console.error("Erro ao buscar faixa de preços:", error);
			});
	}, [eSheet]);

	useEffect(() => {
		console.log(priceRange);
	}, [eSheet]);

	useEffect(() => {}, [eSheet]);
	return (
		<Stack
			direction="vertical"
			style={{
				fontFamily: "var(--body-font)",
				color: "var(--dark-grey)",
				backgroundColor: "var(--white)",
				boxShadow: "var(--shadow-default)",
			}}
			className="rounded-sm w-25 p-4"
		>
			<Image
				src="../../public/assets/pc.jpg"
				className="img-fluid"
				style={{
					mixBlendMode: "darken",
				}}
			/>
			<Stack
				direction="horizontal"
				className="justify-content-between align-items-center"
			>
				<h4
					style={{ color: "var(--variant-two)" }}
					className="m-0 fs-5 text-bold"
				>
					{eSheet?.eSheet?.EquipmentModel?.name}
				</h4>
				<Icon
					d="M16 26C16 26 1 17.8424 1 8.94309C1 0.0437896 10.75 -2.92245 16 8.20156C21.25 -2.92245 31 0.0437812 31 8.94308C31 17.8424 16 26 16 26Z"
					w={"32"}
					h={"27"}
					color={"var(--variant-two)"}
				/>
			</Stack>
			<p className="fs-5">{priceRange}</p>
		</Stack>
	);
}
