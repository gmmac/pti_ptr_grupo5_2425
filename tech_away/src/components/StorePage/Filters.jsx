import React, { useEffect, useState } from "react";
import { Form, Stack, Button } from "react-bootstrap";
import api from "../../utils/axios";

export default function Filters({ filters, setFilters }) {
	const [state, setState] = useState([]);
	const [store, setStore] = useState([]);

	const [tempFilters, setTempFilters] = useState({
		orderBy: "",
		state: "",
		store: "",
	});

	useEffect(() => {
		api
			.get("api/equipmentStatus")
			.then((res) => {
				const statesObj = res.data;
				const statesArray = Object.keys(statesObj).map((key) => ({
					id: key,
					name: statesObj[key].state,
				}));
				setState(statesArray);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, []);

	useEffect(() => {
		api
			.get("api/store")
			.then((res) => {
				const storesObj = res.data.data;
				const storesArray = Object.keys(storesObj).map((key) => ({
					id: key,
					name: storesObj[key].name,
				}));
				setStore(storesArray);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, []);

	// Aplica os filtros apenas quando o botão "Sort By" for clicado
	const applyFilters = () => {
		setFilters(tempFilters);
	};

	// Reseta os filtros ao clicar em "Clear"
	const clearFilters = () => {
		setTempFilters({ orderBy: "", state: "", store: "" });
		setFilters({ orderBy: "", state: "", store: "" });
	};

	return (
		<Stack
			direction="horizontal"
			style={{
				backgroundColor: "var(--white)",
				fontFamily: "var(--body-font)",
				color: "var(--dark-grey)",
			}}
			gap={2}
			className="rounded-pill p-3 justify-content-between align-items-center"
		>
			<Stack
				direction="horizontal"
				gap={2}
				className="justify-content-center align-items-center"
			>
				<Form.Select
					value={filters.orderBy}
					className="rounded-pill"
					style={{
						backgroundColor: "var(--light-grey)",
						boxShadow: "var(--shadow-default)",
					}}
					onChange={(e) => setFilters({ ...filters, orderBy: e.target.value })}
				>
					<option value="">Order By</option>
					<option value="ASC">Alphabetical</option>
					<option value="DESC">Reverse Alphabetical</option>
					<option value="recent-date">Recent Date</option>
					<option value="oldest-date">Oldest Date</option>
				</Form.Select>

				<Form.Select
					value={filters.state}
					className="rounded-pill"
					style={{
						backgroundColor: "var(--light-grey)",
						boxShadow: "var(--shadow-default)",
					}}
					onChange={(e) => setFilters({ ...filters, state: e.target.value })}
				>
					<option value="">State</option>
					{state.map((item) => (
						<option key={item.id} value={item.name}>
							{item.name}
						</option>
					))}
				</Form.Select>

				<Form.Select
					value={filters.store}
					className="rounded-pill"
					style={{
						backgroundColor: "var(--light-grey)",
						boxShadow: "var(--shadow-default)",
					}}
					onChange={(e) => setFilters({ ...filters, store: e.target.value })}
				>
					<option value="">Store</option>
					{store.map((item) => (
						<option key={item.id} value={item.name}>
							{item.name}
						</option>
					))}
				</Form.Select>
			</Stack>

			<Stack
				direction="horizontal"
				gap={2}
				className="justify-content-center align-items-center"
			>
				<Button
					className="rounded-pill px-4"
					style={{
						backgroundColor: "var(--variant-one)",
						color: "var(--white)",
						border: "none",
					}}
					onClick={applyFilters}
				>
					SortBy
				</Button>
				<Button
					className="rounded-pill px-4"
					style={{
						// backgroundColor: "var(--variant-one)",
						color: "var(--white)",
						border: "none",
					}}
					variant="secondary"
					disabled={!filters.orderBy && !filters.state && !filters.store}
					onClick={clearFilters}
				>
					Clear
				</Button>
			</Stack>
		</Stack>
	);
}
