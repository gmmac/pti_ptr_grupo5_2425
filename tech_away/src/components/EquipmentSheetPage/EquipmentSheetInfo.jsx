import React, { useEffect } from "react";
import { Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function EquipmentSheetInfo({ equipmentInfo }) {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1); // Volta para a página anterior
	};

	return (
		<Stack
			direction="horizontal"
			className="rounded-sm p-4 w-100"
			style={{
				backgroundColor: "var(--white)",
				boxShadow: "var(--shadow-default)",
			}}
			gap={4}
		>
			<Link
				onClick={handleGoBack}
				style={{
					cursor: "pointer",
					backgroundColor: "var(--variant-one)",
					textDecoration: "none",
					color: "var(--white)",
				}}
				className="rounded-5 p-2 d-flex justify-content-center align-items-center align-self-start"
			>
				<i className="pi pi-angle-left" style={{ fontSize: "1.5rem" }}></i>
			</Link>
			<Stack direction="vertical" gap={3}>
				<h3
					style={{
						color: "var(--variant-one)",
					}}
					className="fs-3"
				>
					{equipmentInfo?.EquipmentModel?.name}
				</h3>
				<span style={{ color: "var(--dark-grey" }}>
					<p className="m-0 fs-5">
						Retail Price: {equipmentInfo?.EquipmentModel?.price} EUR
					</p>
					<p className="m-0 fs-5">
						Brand: {equipmentInfo?.EquipmentModel?.Brand?.name}
					</p>
					<p className="m-0 fs-5">
						Release Year: {equipmentInfo?.EquipmentModel?.releaseYear}
					</p>
					<p className="m-0 fs-5">Type: {equipmentInfo?.EquipmentType?.name}</p>
				</span>
			</Stack>
		</Stack>
	);
}
