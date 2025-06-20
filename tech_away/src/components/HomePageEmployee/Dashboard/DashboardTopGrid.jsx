import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DashboardStatCard from "./DashboardStatCard";
import api from "../../../utils/axios";

export default function DashboardTopGrid() {
	const [productsOnSale, setProductsOnSale] = useState(null);
	const [totalSoldEquipments, setTotalSoldEquipments] = useState(null);
	const [totalInterests, setTotalSInterests] = useState(null);

	useEffect(() => {
		api.get("/api/usedEquipment/totalOnSaleStock")
			.then((res) => {
				const total = res.data.total;
				setProductsOnSale(total);
			})
			.catch((err) => {
				console.error("Error fetching stock total:", err);
				setProductsOnSale(0); // fallback in case of error
		});

		api.get("/api/usedEquipment/totalSoldEquipments")
			.then((res) => {
				const total = res.data.total;
				setTotalSoldEquipments(total);
			})
			.catch((err) => {
				console.error("Error fetching stock total:", err);
				setTotalSoldEquipments(0); // fallback in case of error
		});

		api.get("/api/interest")
			.then((res) => {
				const total = res.data.totalItems;
				
				console.log("printt: ",res)
				setTotalSInterests(res.data.totalItems ?? 0);
			})
			.catch((err) => {
				console.error("Error fetching stock total:", err);
				setTotalSoldEquipments(0); // fallback in case of error
		});
	}, []);

	

	return (
		<Row className="mb-4 justify-content-center g-4">
			<Col xs={12} sm={10} md={6} lg={4} className="mb-3">
				<DashboardStatCard 
					value={totalInterests !== null ? totalInterests : "Loading..."}
					label="Saved Products" />
			</Col>
			<Col xs={12} sm={10} md={6} lg={4} className="mb-3">
				<DashboardStatCard
					value={productsOnSale !== null ? productsOnSale : "Loading..."}
					label="Products in Stock"
				/>
			</Col>
			<Col xs={12} sm={10} md={6} lg={4} className="mb-3">
				<DashboardStatCard 
					value={totalSoldEquipments !== null ? totalSoldEquipments : "Loading..."} 
					label="Sales" 
				/>
			</Col>
		</Row>
	);
}